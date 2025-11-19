import pygame
import sys
from mazeLogic.maze import Maze
from mazeLogic.mazeGen import MazeGen

pygame.init()

WIDTH, HEIGHT = 800, 600

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

button_color = (180, 180, 180)
hover_color = (120, 120, 120)

clear_button_rect = pygame.Rect(200, 500, 100, 30)
gener_button_rect = pygame.Rect(350, 500, 100, 30)
solve_button_rect = pygame.Rect(500, 500, 100, 30)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Maze generator")
font = pygame.font.Font(None, 20)

clock = pygame.time.Clock()
running = True

CELL_SIZE = 12
THICKNESS = 2

maze = Maze(30, 30)
maze.SetBoard()

START_X = 0
START_Y = 0

mazeGen = MazeGen(maze, START_X, START_Y)

solving = False
solved = False

while running:
    mouse_pos = pygame.mouse.get_pos()
    mouse_pressed = pygame.mouse.get_pressed()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    is_hovered_clear = clear_button_rect.collidepoint(mouse_pos)
    is_hovered_start = gener_button_rect.collidepoint(mouse_pos)
    is_hovered_solve = solve_button_rect.collidepoint(mouse_pos)

    screen.fill(BLACK)

    pygame.draw.rect(screen, hover_color if is_hovered_clear else button_color, clear_button_rect, border_radius=8)
    pygame.draw.rect(screen, hover_color if is_hovered_start else button_color, gener_button_rect, border_radius=8)
    pygame.draw.rect(screen, hover_color if is_hovered_solve else button_color, solve_button_rect, border_radius=8)

    clear_surf = font.render("Clear", True, (255, 255, 255))
    clear_text = clear_surf.get_rect(center=clear_button_rect.center)
    screen.blit(clear_surf, clear_text)
    
    start_surf = font.render("Generate", True, (255, 255, 255))
    start_text = start_surf.get_rect(center=gener_button_rect.center)
    screen.blit(start_surf, start_text)
    
    solve_surf = font.render("Solve", True, (255, 255, 255))
    solve_text = solve_surf.get_rect(center=solve_button_rect.center)
    screen.blit(solve_surf, solve_text)

    if is_hovered_clear and mouse_pressed[0]:
        solving = False
        solved = False
        mazeGen.Stop()
        maze.Reset_Board()

    if is_hovered_start and mouse_pressed[0]: 
        mazeGen.Stop()
        maze.Reset_Board()
        mazeGen.Forward()
        solved = False
        solving = True

    if is_hovered_solve and mouse_pressed[0]:
        if solved:
            

    if solving == True:
        output = mazeGen.Forward()
        solving = not output
        if not solving: 
            solved = True




    maze.RenderBoard(screen, WHITE, CELL_SIZE, WIDTH, HEIGHT, THICKNESS)

    pygame.display.flip()

    clock.tick(1000)

pygame.quit()
sys.exit()

if __name__ == "__main__":
    main()