import random
from .maze import Maze
from .tile import Tile

class MazeSolve:
    def __init__(self, maze: Maze, start_x, start_y, end_x, end_y):
        self.maze = maze
        self.board = maze.board
        self.start_x = start_x
        self.start_y = start_y
        goal = self.board[end_x][end_y]
        self.goal = goal
        self.activeTile = None
        self.stack: list[Tile] = []
        self.visited = set()
    
    def SetStart(self):
        self.x = self.start_x
        self.y = self.start_y
        self.stack = []
        self.visited = set()
        self.activeTile = None  
        self.moves = 0

    def SetActive(self, tile: Tile):
        if self.activeTile: self.activeTile.SetActive(False)
        self.activeTile = tile
        tile.SetActive(True)

    def Forward(self):
        tile: Tile = self.board[self.x][self.y]
        self.SetActive(tile)

        if not self.stack:
            self.stack.append(tile)
            self.visited.add((tile.x, tile.y))

        if self.goal is not None and (tile.x, tile.y) == (self.goal.x, self.goal.y):
            for tile in self.stack:
                tile.isActive = True
            return True

        adjacent_tiles: list[Tile] = self.maze.GetAdjacentOpenTiles(tile)
        unvisited = [n for n in adjacent_tiles if (n.x, n.y) not in self.visited]

        if unvisited:
            next = random.choice(unvisited)
            self.stack.append(next)
            self.visited.add((next.x, next.y))
            self.x, self.y = next.x, next.y
            self.SetActive(next)
            return False
        else:
            self.stack.pop()
            if not self.stack:
                return False
            prev = self.stack[-1]
            self.x, self.y = prev.x, prev.y
            self.SetActive(prev)
            return False




