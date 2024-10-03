const express = require('express');
const app = express();
const logger = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT;
const conn = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');