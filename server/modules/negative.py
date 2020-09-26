from PIL import Image
import numpy as np

from modules.image_parser import ImageParser


class Negative(ImageParser):
    __image = None
    __negative_image = None
    __negative_pixel_matrix = []

    def __init__(self, path):
        super().__init__(path)
        self._init_negative_pixel_matrix()
        self._init_negative_image()

    def _init_negative_pixel_matrix(self):
        np_pixel_matrix = self.get_pixel_matrix().max() - 1 - self.get_pixel_matrix()
        self.__negative_pixel_matrix = np_pixel_matrix

    def _init_negative_image(self):
        negative_image = Image.fromarray(self._pixel_matrix_to_hsv_format(self.get_negative_pixel_matrix()), 'HSV')
        self.__negative_image = negative_image

    def get_negative_pixel_matrix(self):
        return self.__negative_pixel_matrix

    def get_negative_image(self):
        return self.__negative_image.convert('RGB')
