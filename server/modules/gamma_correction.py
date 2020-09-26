from PIL import Image
import numpy as np

from modules.image_parser import ImageParser


class GammaCorrection(ImageParser):
    __gamma = 0
    __c = 0
    __corrected_pixel_matrix = []
    __corrected_image = None

    def __init__(self, path, gamma, c):
        super(GammaCorrection, self).__init__(path)
        self.__gamma = gamma
        self.__c = c
        self._init_corrected_pixel_matrix()
        self._init_corrected_image()

    def _init_corrected_pixel_matrix(self):
        numerator = self.__c * np.power(self.get_pixel_matrix(), self.__gamma)
        denominator = np.power(self.get_pixel_matrix().max() - 1, self.__gamma - 1)
        np_corrected_pixel_matrix = numerator / denominator
        self.__corrected_pixel_matrix = np_corrected_pixel_matrix

    def _init_corrected_image(self):
        corrected_image = Image.fromarray(self._pixel_matrix_to_hsv_format(self.get_corrected_pixel_matrix()), 'HSV')
        self.__corrected_image = corrected_image

    def get_corrected_pixel_matrix(self):
        return self.__corrected_pixel_matrix

    def get_corrected_image(self):
        return self.__corrected_image.convert('RGB')
