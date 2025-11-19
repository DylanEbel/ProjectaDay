import random 
from .maze import Maze
from .tile import Tile

class MazeGen: 
    def __init__(self, maze: Maze, start_x, start_y):
        self.maze = maze 
        self.board = maze.board
        self.x, self.y = start_x, start_y
        self.start_x, self.start_y = start_x, start_y
        self.activeTile = None
        self.stack = []
        self.maxStack = maze.width * maze.height    
        self.stack.append((self.x, self.y))

    def UpdateWalls(self, tile: Tile, nextTile: Tile):
        dx: int = nextTile.x - tile.x 
        dy: int = nextTile.y - tile.y

        tile.RemoveWall(dx, dy)
        nextTile.RemoveWall(-dx, -dy)

    def Stop(self):
        self.x = self.start_x
        self.y = self.start_y
        self.stack = []
        self.activeTile = None  
        self.stack.append((self.x, self.y))

    def Forward(self):
        tile: Tile = self.board[self.x][self.y]
        if self.activeTile: self.activeTile.SetActive(False)
        self.activeTile = tile
        self.activeTile.Visit()
        tile.SetActive(True)
        
        adjacent_tiles = self.maze.GetAdjacentTiles(tile, self.stack)

        if not adjacent_tiles:
            if not self.stack:
                self.activeTile.SetActive(False)
                return True
            self.stack.pop()
            if not self.stack:
                self.activeTile.SetActive(False)
                return True
            last_x, last_y = self.stack[-1]
            self.x, self.y = last_x, last_y
            return False

        nextTile: Tile = adjacent_tiles[random.randrange(0, len(adjacent_tiles))]

        self.UpdateWalls(tile, nextTile)

        self.x, self.y = nextTile.x, nextTile.y
        self.stack.append((self.x, self.y))

        return False




         