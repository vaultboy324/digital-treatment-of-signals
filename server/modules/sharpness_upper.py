import numpy as np
from PIL import Image
from scipy.signal import convolve2d

from .image_parser import ImageParser

from constants import sharpness_upper_operators


class SharpnessUpper(ImageParser):
    __image__ = None
    __processed_image = None
    __processed_image_pixel_matrix = []
    __operator_type = None

    def __init__(self, path, operator_type=sharpness_upper_operators.ROBERTS_OPERATOR):
        super().__init__(path)
        self.__operator_type = operator_type
        self.__init_processed_image_pixel_matrix()
        self.__init_processed_image()

    def __init_processed_image_pixel_matrix(self):
        if self.__operator_type == sharpness_upper_operators.ROBERTS_OPERATOR:
            self.__create_roberts()
        elif self.__operator_type == sharpness_upper_operators.SOBELL_OPERATOR:
            self.__create_sobell()
        elif self.__operator_type == sharpness_upper_operators.LAPLACIAN:
            self.__create_laplacian()
        else:
            self.__create_laplacian_with_base()

    def __create_roberts(self):
        pixel_matrix = self.get_pixel_matrix()
        Gx = convolve2d(pixel_matrix, sharpness_upper_operators.ROBERTS_MATRIX_X)
        Gy = convolve2d(pixel_matrix, sharpness_upper_operators.ROBERTS_MATRIX_Y)
        processed_image_pixel_matrix = np.sqrt(np.power(Gx, 2) + np.power(Gy, 2))

        self.__processed_image_pixel_matrix = processed_image_pixel_matrix

    def __create_sobell(self):
        pixel_matrix = self.get_pixel_matrix()
        Gx = convolve2d(pixel_matrix, sharpness_upper_operators.SOBELL_MATRIX_X)
        Gy = convolve2d(pixel_matrix, sharpness_upper_operators.SOBELL_MATRIX_Y)
        processed_image_pixel_matrix = np.sqrt(np.power(Gx, 2) + np.power(Gy, 2))

        self.__processed_image_pixel_matrix = processed_image_pixel_matrix

    def __create_laplacian(self):
        pixel_matrix = self.get_pixel_matrix()
        processed_image_pixel_matrix = convolve2d(pixel_matrix,
                                                  sharpness_upper_operators.LAPLACIAN_MATRIX,
                                                  mode='same')

        self.__processed_image_pixel_matrix = processed_image_pixel_matrix

    def __create_laplacian_with_base(self):
        self.__create_laplacian()

        pixel_matrix = self.get_pixel_matrix()
        if sharpness_upper_operators.LAPLACIAN_MATRIX[1][1] < 0:
            self.__processed_image_pixel_matrix = pixel_matrix - self.__processed_image_pixel_matrix
        else:
            self.__processed_image_pixel_matrix += pixel_matrix

    def __init_processed_image(self):
        processed_image = Image.fromarray(self.get_processed_image_pixel_matrix())
        self.__processed_image = processed_image

    def get_processed_image_pixel_matrix(self):
        return self.__processed_image_pixel_matrix

    def get_processed_image(self):
        return self.__processed_image.convert('L')
