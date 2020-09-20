from PIL import Image
import numpy as np


class Negative:
    __path = None

    __image = None
    __negative_image = None

    __width = 0
    __height = 0

    __pixel_matrix = []
    __negative_pixel_matrix = []

    def __init__(self, path):
        self.__path = path
        self.__image = Image.open(self.__path).convert('HSV')
        self.__width = self.__image.size[0]
        self.__height = self.__image.size[1]
        self._init_pixel_matrix()
        self._init_negative_pixel_matrix()
        self._init_negative_image()

    def _init_pixel_matrix(self):
        pixel_matrix = np.zeros((self.__width, self.__height), np.uint8)
        for i in range(0, self.__width):
            for j in range(0, self.__height):
                hsv_pixel = self.__image.getpixel((i, j))
                brightness = hsv_pixel[len(hsv_pixel) - 1]
                pixel_matrix[i][j] = brightness
        self.__pixel_matrix = pixel_matrix

    def _init_negative_pixel_matrix(self):
        np_pixel_matrix = self.__pixel_matrix.max() - 1 - self.__pixel_matrix
        self.__negative_pixel_matrix = np_pixel_matrix

    def _init_negative_image(self):
        negative_image = Image.fromarray(self.__pixel_matrix_to_hsv_format(self.__negative_pixel_matrix), 'HSV')
        self.__negative_image = negative_image

    def __pixel_matrix_to_hsv_format(self, pixel_matrix):
        result = np.zeros((self.__height, self.__width, 3), dtype=np.uint8)
        for i in range(0, self.__width):
            for j in range(0, self.__height):
                result[j][i][2] = pixel_matrix[i][j]
        return result

    def get_pixel_matrix(self):
        return self.__pixel_matrix

    def get_negative_pixel_matrix(self):
        return self.__negative_pixel_matrix

    def get_image(self):
        return self.__image

    def get_negative_image(self):
        return self.__negative_image.convert('RGB')
