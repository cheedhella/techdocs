What is AI?
    Goal of AI is to create machines that simulate human-like intellingence and behaviour;
    Eg: Self driving cars, email classification, spam filters, fraud detection etc; Play chess like vishwanadhan Anandhan;
    Strong AI
        - Expert at everything;
        - Learns like a child, building on it's own experiences;
        - Goal of strong AI is to create machines that are as intelligent as humans;
        - We are far away from achieving this;
    Weak AI
        - They focus on a specific task, eg: self driving cars - they can only drive;
        - AI systems that we see these days belong to this category;

What is generative AI?
    Building solutions using AI is not easy:
        - Scarcity of skills;
        - Need to create/manage massive datasets;
        - Complex infrastructure needs;
        - Complexcity of managing AI models;
    How to use AI without AI skills and complex infrastructure?
        - Use low code AI platforms(such as AutoML);
        - Use pre-trained models(especially generative AI models)
    Goal of AI is: 
        Write a new article;
        Summarize an essay;
        Create new image;

Google offers plenty of solutions around Generative AI:
    Gemini
        - Google's LLM;
        - Bard vs Gemini -> Bard is renamed to Gemini in 2024;
    AI Studio
        - It lets you quickly try google's latest LLMs and expertiment with different prompts;
        - MakerSuite vs AI Studio - MakerSuite is rebranded as AI Studio in early 2023;
        - It is for developers;
        - How to use?
            -- Get API key;
            -- pip install google-generativeai 
            -- export API_KEY=<API_KEY>
            -- Eg:
                import google-generativeai as genai 
                import os 
                genai.configure(api_key=os.environ["API_KEY"])
                model = genai.GenerativeModel("gemini-1.5-flash)
                response = model.generate_content("What does the fox say?")
    Palm API 
        - Rest API which gives access to google's gemini LLMs(hosted on google cloud vertex AI);
    AI Studio vs Vertex AI 
        - Primary google cloud machine learning service;
        - Vertex AI - AI ML platform
        If you want to integrate generative AI into your mobile app, you can do that very easily using Palm API;






        
         Playground 
        
        Image creation and editing, video streaming, audio streaming, and advanced text generation are just a few of the capabilities that the platform offers.
        
        
        Maker
    PALM API & MakerSuite - They make it easy to consume generative AI APIs;
        AI Studio – launched in late 2023 as the evolution of MakerSuite.

What is Chatbot?
    Rule based
        - Uses predefined scripts and decision trees; 
        - Eg: Press 1 for billing, 2 for support;
    AI based
        - Uses machine learning and NLP to understand and respond like a human;
        - Eg: ChatGPT, Google Bard/Gemini, Microsoft Copilot, Siri (Apple), Alexa (Amazon) etc;

Applications of Chatbot?
    -  Answering questions
        Writing help
        Coding assistance
        Summarizing and searching information


What is AI Studio?
    Playground for PaLM models (like OpenAI’s ChatGPT Playground)



Hosted under Google AI Studio (previously MakerSuite) and Vertex AI for more enterprise-focused features

