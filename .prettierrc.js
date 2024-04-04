/**
 * @file The prettier config.
 */

import {options} from "./eslint.config.js";
import {prettierConfigGenerator} from "@logicer/prettier-config";

export default prettierConfigGenerator(options);
