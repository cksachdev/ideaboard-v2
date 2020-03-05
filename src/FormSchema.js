module.exports = {
    "type": "object",
    "required": [
        "starttime",
        "endtime",
        "title",
        "description",
        "tags"
    ],
    "properties": {
        "starttime": {
          "name": "startTime",
          "type": "string",
          "format": "time",
          "x-class": "sm6 pr-4"
        },
        "endtime": {
          "type": "string",
          "format": "time",
          "x-class": "sm6"
        },
        "title": {
          "type": "string",
          "require": true
        },
        "description": {
          "type": "string",
          "maxLength": 1000
        },
        "tags": {
          "type": "array",
          "description": "Hit enter to add multiple tags",
          "items": {
            "type": "string"
          },
          "minItems": 1
        }
    }
  }