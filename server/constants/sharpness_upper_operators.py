import numpy as np

ROBERTS_OPERATOR = 'ROBERTS_OPERATOR'
SOBELL_OPERATOR = 'SOBELL_OPERATOR'
LAPLACIAN = 'LAPLACIAN'
LAPLACIAN_WITH_BASE = 'LAPLACIAN_WITH_BASE'

ROBERTS_MATRIX_X = [[0, 1],
                    [-1, 0]]

ROBERTS_MATRIX_Y = [[1, 0],
                    [0, -1]]

SOBELL_MATRIX_X = [[-1, 0, 1],
                   [-2, 0, 2],
                   [-1, 0, 1]]

SOBELL_MATRIX_Y = [[-1, -2, -1],
                   [0, 0, 0],
                   [1, 2, 1]]

LAPLACIAN_MATRIX = np.array([[0, 1, 0],
                             [1, -4, 1],
                             [0, 1, 0]],
                            dtype=np.float32)
