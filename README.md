# H.E.R. DAO Member Badge Generator

![Sample Badge](/public/sample.png)

A modern web application that allows users to create personalized membership badges for H.E.R. DAO. Generate your unique member badge with your photo, name, and role, then share it on social media to celebrate joining the community.

## Features

- **Personalized Badge Generation**: Upload your photo and add your name and role
- **Modern UI**: Clean, responsive design with Poppins font
- **Social Sharing**: Share your badge directly on X (Twitter) with one click
- **Download**: Save your badge as a high-quality PNG image
- **Mobile & Desktop Support**: Works seamlessly on all devices

## How to Use

1. **Enter Your Information**: Fill in your name and role
2. **Upload Your Photo**: Add a clear profile picture
3. **Generate Badge**: Click "Generate" to create your personalized badge
4. **Share or Download**: Use the action buttons to share on X or download your badge

## Technology Stack

- **Frontend**: Next.js 15 with React
- **Styling**: Tailwind CSS with custom color scheme
- **Icons**: Lucide React
- **Canvas**: HTML5 Canvas for badge generation
- **Fonts**: Poppins (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oyingrace/getyourcard
cd getyourcard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
getyourcard/
├── app/
│   ├── components/
│   │   ├── IDGenerator.tsx    # Badge generation logic
│   │   ├── ImageUpload.tsx    # Photo upload component
│   │   └── UserForm.tsx       # Name and role form
│   ├── globals.css            # Global styles and theme
│   ├── layout.tsx             # App layout
│   └── page.tsx               # Main page
├── public/
│   └── card-blank.png         # Badge template
└── README.md
```

## Customization

### Colors
The app uses a custom color scheme defined in `app/globals.css`:
- Primary Pink: `#981957`
- Secondary Pink: `#FF9CCC`

### Badge Template
Replace `public/card-blank.png` with your own badge template. The generator will automatically position the user's photo and text based on the template dimensions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## About H.E.R. DAO

H.E.R. DAO is a decentralized autonomous organization focused on empowering women in the blockchain and Web3 space. This badge generator helps members create and share their membership proudly across social media platforms.

---

**Built with ❤️ for the H.E.R. DAO community**