# Food package information extractor
## What is it?
This project is a tool that aims to make the extraction of information from food products a lot easier. The tool uses OCR to extract the text from images and then runs it through an LLM to organise all information in a neat JSON object and translate it if it's not in english.
After extraction to will sort the information into a form where you can double-check the information and then stemporarily save it. All saved exractions will be visible in the extractions tab where you can access the information again if needed.

---

> [!WARNING] 
> ### Warning: project not finished.
> Although this project works as is, the description above has not yet been realised.
> Do not expect a complete and polished version.

---

## Table of Contents
1. [Features](#features)
2. [Project Setup](#project-setup)
3. [Coding Conventions](#coding-conventions)
4. [License](#license)
5. [Attribution](#attribution)

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

---

## Coding Conventions

### 1. **Formatting**
**Rules:**
- Follow the **Airbnb** style guide.
- Use **camelCase** for variables and functions.
- Use **PascalCase** for React component names.

### 2. **File and Component Naming**
- Components are stored in the `components/` or `pages/` folder and are named using **PascalCase** (e.g., `Header.jsx`).
- Hooks are stored in the `shared/hooks/` folder and are named using **camelCase** (e.g., `useFetch.js`).

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