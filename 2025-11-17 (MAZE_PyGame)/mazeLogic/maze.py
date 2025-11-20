from .tile import Tile

TOP, BOTTOM, LEFT, RIGHT = 0, 1, 2, 3

class Maze:
    directions = [
        (0, -1, 0),  # up
        (0, 1, 1),   # down
        (-1, 0, 2),  # left
        (1, 0, 3)    # right
    ]

    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height
        self.board = [[None for _ in range(width)] for _ in range(height)]

    def SetBoard(self):
        for i in range(self.height):
            for j in range(self.width):
                tile = self.CreateTile(j, i)
                self.board[j][i] = tile

    def CreateTile(self, x: int, y: int):
        tile = Tile(x, y)
        return tile
    
    def GetAdjacentTiles(self, tile: Tile, stack: list = None):
        x, y = tile.x, tile.y
        adjacent_tiles = []

        for dx, dy, _ in self.directions:
            newX = x + dx
            newY = y + dy

            if 0 <= newX < self.width and 0 <= newY < self.height and (newX, newY) not in stack:
                adjacent_tile: Tile = self.board[newX][newY]
                if not adjacent_tile.visited: adjacent_tiles.append(adjacent_tile)

        return adjacent_tiles
    
    def GetAdjacentOpenTiles(self, tile: Tile):
        x, y = tile.x, tile.y
        adjacent_tiles = []

        for dx, dy, dir in self.directions:
            newX = x + dx
            newY = y + dy

            if 0 <= newX < self.width and 0 <= newY < self.height: 
                adjacent_tile: Tile = self.board[newX][newY]

                if tile.CanVisit(adjacent_tile, dir): adjacent_tiles.append(adjacent_tile)

        return adjacent_tiles

    def Reset_Board(self):
        for i in range(self.height):
            for j in range(self.width):
                tile: Tile = self.board[j][i]
                tile.Reset()
    
    def RenderBoard(self, screen, color, cell_size, width, height, thickness):
        mazeWidth = cell_size * self.width
        mazeHeight = cell_size * self.height

        x_offset = (width - mazeWidth) / 2
        y_offset = (height - mazeHeight) / 2 - 20

        for i in range(self.height):
            for j in range(self.width):
                tile: Tile = self.board[j][i]
                if i == 0 and j == 0:
                    tile.RenderTile(screen, color, cell_size, x_offset, y_offset, thickness, TOP)
                elif i == self.height - 1 and j == self.width - 1: tile.RenderTile(screen, color, cell_size, x_offset, y_offset, thickness, BOTTOM)
                else: tile.RenderTile(screen, color, cell_size, x_offset, y_offset, thickness)
                
