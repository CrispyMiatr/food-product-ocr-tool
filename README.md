# Food package information extractor
## What is it?
This project is a tool that aims to make the extraction of information from food products a lot easier. The tool uses OCR to extract the text from images and then runs it through an LLM to organise all information in a neat JSON object and translate it if it's not in english.
After extraction to will sort the information into a form where you can double-check the information and then stemporarily save it. All saved exractions will be visible in the extractions tab where you can access the information again if needed.

---

## Features
- Extract information from food product images using OCR.
- Manually check the extracted information.
- Access previously extracted information when needed.

---

## Project Setup

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CrispyMiatr/food-product-ocr-tool
   ```

2. Back-End:

    2.1 **Install dependencies:**
   ```bash
   cd food-product-ocr-tool
   cd back-end
   npm install
   ```

    2.2. **Run the local server:**
   ```bash
   npm start
   ```
   Back end listening on port `http://localhost:3001/`

3. Front-End:

    3.1 **Install dependencies:**
   ```bash
   cd food-product-ocr-tool
   cd front-end
   npm install
   ```

    3.2. **Run the development server:**
   ```bash
   npm run dev
   ```
   This will start a development server at `http://localhost:3001/`

> [!IMPORTANT] 
> ### Google Cloud Credentials.
> Without proper credentials, the OCR tool will not work.
> Use the Google Vision API for OCR functionality, and Google Vertex AI for text processing.  
> Make sure you have a Google Cloud account and create a service account key for the above mentioned in JSON format.
> Upload the JSON file to your project and rename it as `food-product-vertex-tool.json`.  
> Additionally, create a .env file and set the following environment variables:
> ```
> GOOGLE_CLOUD_PROJECT="food-product-ocr-tool"
> GOOGLE_CLOUD_LOCATION="europe-west1"
> GOOGLE_APPLICATION_CREDENTIALS="./food-product-vertex-tool.json"
> ```

---

## License
This product is licensed under the [MIT](./LICENSE) license.

---

## Attribution

### Documentations
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [SCSS](https://sass-lang.com/documentation/)
- [Google Cloud](https://cloud.google.com/)
- [Google Cloud docs](https://cloud.google.com/docs)

### External code
> This repository helped me get started with the project, since I had little direction of how to begin. Not much, if any code was used from this repository. 
- [OCR-RN-Scanner](https://github.com/GeroWalther/OCR-RN-Scanner)