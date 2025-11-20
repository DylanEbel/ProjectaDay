import pygame

TOP, BOTTOM, LEFT, RIGHT = 0, 1, 2, 3

class Tile:

    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y
        self.Reset()

    def RenderTile(self, screen: pygame.Surface, color, cell_size: int, x_offset, y_offset, thickness: int = 2, remove = -1):
        x0 = self.x * cell_size + x_offset
        x1 = x0 + cell_size

        y0 = self.y * cell_size + y_offset
        y1 = y0 + cell_size

        cell_rect = pygame.Rect(x0, y0, cell_size, cell_size)

    
        if (self.isActive):
            pygame.draw.rect(screen, (255, 0, 0), cell_rect)
        else: 
            pygame.draw.rect(screen, (0, 0, 0), cell_rect)

        if self.walls[TOP] and (remove < 0 or remove != TOP):
            pygame.draw.line(screen, color, (x0, y0), (x1, y0), thickness)
        if self.walls[BOTTOM] and (not remove or remove != BOTTOM):
            pygame.draw.line(screen, color, (x0, y1), (x1, y1), thickness)
        if self.walls[LEFT] and (not remove or remove != LEFT):
            pygame.draw.line(screen, color, (x0, y0), (x0, y1), thickness)
        if  self.walls[RIGHT] and (not remove or remove != RIGHT):
            pygame.draw.line(screen, color, (x1, y0), (x1, y1), thickness)

    def RemoveWall(self, dx: int, dy: int):
        if dx == 1:
            self.walls[RIGHT] = False
        elif dx == -1:
            self.walls[LEFT] = False
        elif dy == 1:
            self.walls[BOTTOM] = False
        elif dy == -1:
            self.walls[TOP] = False

    def GetOpenWalls(self):
        return self.walls

    def CanVisit(self, adjacentTile: "Tile", dir):
        isOurWallOpen = self.walls[dir]
        oppositeDirection = self.GetOppositeDirection(dir)
        isTheirWallOpen = adjacentTile.walls[oppositeDirection]
        return not isOurWallOpen and not isTheirWallOpen


    def Reset(self):
        self.walls = [True, True, True, True]
        self.visited = False
        self.isActive = False

    def GetOppositeDirection(self, dir: int):
        if (dir == 1): return 0
        if (dir == 0): return 1
        if (dir == 3): return 2
        if (dir == 2): return 3


    def Visit(self):
        self.visited = True

    def SetActive(self, isOn: bool):
        self.isActive = isOn