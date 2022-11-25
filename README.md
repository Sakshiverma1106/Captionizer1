# Captionizer: Beautiful Quote Suggestions by AI:sparkles:
Sucked :unamused: by searching some nice quotes for your post online. Bored of posting random quotes with your images.

Use captionizer to suggest some quotes from the internet that are suitable to your image through AI. 

You can also get your quotes based on your given keywords.
## Demo
You can view the site live at [captionizerr.netlify.app](https://captionizerr.netlify.app)

## How It Works
The algorithm uses machine learning and natural language processing to process. It all works in three major steps:
- It extract all the objects from the image (eg. flower, sun). 
- It uses natural language processing to find synonyms of all the objects detected in the image.
- Then it use an external api to fetch quotes related to all the words.   

## Technology Used
- **FrontEnd** : React, ReactRouter, Sass
- **Backend API**: Flask
- **Object Detection**: TinyYoloV4 with ImageAI
- **NLP**: NLTK
- **Quotes Api**: [Quotable.io](https://github.com/lukePeavey/quotable)
- **Backend Hosting**: Heroku
- **Frontend Hosting**: Netlify

## Screenshots
Drop your image or select from folder to upload.

![App Screenshot](https://64.media.tumblr.com/01b1cdaf4ccc58f82b07f5afd0e9f22e/6cd16d91c454bd30-fa/s2048x3072/66196dac37b63605dd878197f7596fa67ab9bb69.pnj)

Get quote suggestions and click on any quote to copy it to clipboard.

![App Screenshot](https://64.media.tumblr.com/c95bf1cf8196bc5443b4e4f181e33151/6cd16d91c454bd30-c1/s2048x3072/98f16ae0c2c7e336653ec14b9d8b999861908ff9.pnj)

Get quotes based on your given keyword inputs.

![App Screenshot](https://64.media.tumblr.com/04676d47208c551d512e8ec75a2ba108/6cd16d91c454bd30-d7/s2048x3072/38963465f0fe81acdbc78427ee7975d630746952.pnj)


## Run Locally

Clone the project

```bash
  git clone https://github.com/rohitmirchandani/captionizer
```

Go to the project directory

```bash
  cd rock-paper-scissors-online
```
Go to backend and install dependencies 

```bash
cd Backend
pip install -r requirements.txt
```
Start the server
```bash
python server.py
```
Install frontend dependencies

```bash
  cd ..
  cd Frontend
  npm install
```

Start the Frontend server

```bash
npm run start
```

## Future Scope
- The application is slow as it does many high performance things at the same time and due to that it does effect the user experience.
- The object detection might be replaced or kept with image captioning to extract keywords from image.


## Authors

- [@rohitmirchandani](https://www.github.com/rohitmirchandani)


## Feedback

For feedback, email rohitmirchandani365@gmail.com.
