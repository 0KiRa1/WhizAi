import logo from "./logo.png";
import gradientBackground from "./gradientBackground.png";
import user_group from "./user_group.png";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import profile_img_1 from "./profile_img_1.png";
import arrow_icon from "./arrow_icon.svg";
import { SquarePen, Hash, Image, Eraser, Scissors, FileText } from 'lucide-react'
import ai_gen_img_1 from "./ai_gen_img_1.png";
import ai_gen_img_2 from "./ai_gen_img_2.png";
import ai_gen_img_3 from "./ai_gen_img_3.png";

export const assets = {
    logo,
    gradientBackground,
    user_group,
    star_icon,
    star_dull_icon,
    profile_img_1,
    arrow_icon,
};

export const AiToolsData = [
    {
        title: 'AI Article Writer',
        description: 'Turn your ideas into well-structured, engaging articles in seconds with our AI-powered writing assistant.',
        Icon: SquarePen,
        bg: { from: '#FA8D16', to: '#FFC36E' },
        path: '/ai/write-article'
    },
    {
        title: 'Blog Title Generator',
        description: 'Craft catchy, SEO-friendly blog titles that capture attention and boost your reach instantly.',
        Icon: Hash,
        bg: { from: '#F6A623', to: '#FF7F50' },
        path: '/ai/blog-titles'
    },
    {
        title: 'AI Image Generation',
        description: 'Bring your vision to life with breathtaking AI-generated images in various styles and formats.',
        Icon: Image,
        bg: { from: '#20C363', to: '#11B97E' },
        path: '/ai/generate-images'
    },
    {
        title: 'Background Removal',
        description: 'Clean up your visuals by removing backgrounds with just one click using AI precision.',
        Icon: Eraser,
        bg: { from: '#F9A825', to: '#FA8D16' },
        path: '/ai/remove-background'
    },
    {
        title: 'Object Removal',
        description: 'Erase unwanted objects from your photos effortlessly and keep your images flawless.',
        Icon: Scissors,
        bg: { from: '#FF7043', to: '#F4511E' },
        path: '/ai/remove-object'
    },
    {
        title: 'Resume Reviewer',
        description: 'Let AI highlight strengths and weaknesses in your resume to help you land your dream job.',
        Icon: FileText,
        bg: { from: '#12B7AC', to: '#08B6CE' },
        path: '/ai/review-resume'
    }
]

export const dummyTestimonialData = [
    {
        image: assets.profile_img_1,
        name: 'Sophia Carter',
        title: 'Content Manager, Creatify',
        content: 'WhizAi has completely changed how we work. From writing to visuals, it’s like having a 24/7 creative partner.',
        rating: 5,
    },
    {
        image: assets.profile_img_1,
        name: 'Liam Johnson',
        title: 'Freelance Writer',
        content: 'I save hours every week. The AI writer and blog title generator alone are worth it. Highly recommended!',
        rating: 4,
    },
    {
        image: assets.profile_img_1,
        name: 'Emily Chen',
        title: 'Marketing Specialist',
        content: 'The background and object removal tools are game-changers for our design team. Super fast and accurate!',
        rating: 5,
    },
]

export const dummyCreationData = [
    {
        "id": 9,
        "user_id": "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
        "prompt": "Generate a blog title for the keyword AI in the category Productivity.",
        "content": "Here are some blog title options:\n\n* AI Hacks for Productivity: Do More in Less Time\n* Smarter Workdays: How AI Can Boost Your Efficiency\n* From Chaos to Clarity: Productivity Tools Powered by AI",
        "type": "blog-title",
        "publish": false,
        "likes": [],
        "created_at": "2025-07-01T11:09:50.492Z",
        "updated_at": "2025-07-01T11:09:50.492Z"
    },
    {
        "id": 8,
        "user_id": "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
        "prompt": "Generate a blog title for the keyword Design in the category Creative.",
        "content": "Here are a few creative blog title ideas:\n\n* Designing with AI: Creativity Meets Technology\n* The Future of Art: AI as Your Creative Partner\n* Beyond Imagination: How AI Shapes Modern Design",
        "type": "blog-title",
        "publish": false,
        "likes": [],
        "created_at": "2025-07-01T11:08:10.450Z",
        "updated_at": "2025-07-01T11:08:10.450Z"
    },
    {
        "id": 7,
        "user_id": "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
        "prompt": "Write an article about AI and Content Creation (500-800 words).",
        "content": "## AI and the Future of Content Creation\n\nArtificial intelligence is no longer just a futuristic concept — it’s already transforming how we create content today. From automated writing tools to image generators, AI empowers creators to save time, enhance creativity, and produce professional-quality work...\n\n(continue with detailed sections on writing, design, and career benefits)",
        "type": "article",
        "publish": false,
        "likes": [],
        "created_at": "2025-07-01T11:07:51.312Z",
        "updated_at": "2025-07-01T11:07:51.312Z"
    }
]

export const dummyPublishedCreationData = [
    {
        "id": 1,
        "user_id": "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
        "prompt": "Generate an illustration of a person brainstorming with glowing AI icons around them, flat modern style.",
        "content": ai_gen_img_1,
        "type": "image",
        "publish": true,
        "likes": [
            "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
            "user_2yaW5EHzeDfQbXdAJWYFnZo2bje"
        ],
        "created_at": "2025-06-19T09:02:25.035Z",
        "updated_at": "2025-06-19T09:58:37.552Z",
    },
    {
        "id": 2,
        "user_id": "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
        "prompt": "Generate an image of futuristic workspace with AI holograms helping a designer, minimal flat style.",
        "content": ai_gen_img_2,
        "type": "image",
        "publish": true,
        "likes": [
            "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
            "user_2yaW5EHzeDfQbXdAJWYFnZo2bje"
        ],
        "created_at": "2025-06-19T08:16:54.614Z",
        "updated_at": "2025-06-19T09:58:40.072Z",
    },
    {
        "id": 3,
        "user_id": "user_2yaW5EHzeDfQbXdAJWYFnZo2bje",
        "prompt": "Generate an image of AI as a friendly robot assisting with writing, digital art style.",
        "content": ai_gen_img_3,
        "type": "image",
        "publish": true,
        "likes": [
            "user_2yaW5EHzeDfQbXdAJWYFnZo2bje"
        ],
        "created_at": "2025-06-23T11:29:23.351Z",
        "updated_at": "2025-06-23T11:29:44.434Z",
        "__v": 1
    },
]
