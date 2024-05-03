from transformers import pipeline,AutoTokenizer
import PyPDF2
import io


class PersonalityPredictor:
    
    def __init__(self, resume):
        self.tokenizer =  AutoTokenizer.from_pretrained("JanSt/albert-base-v2_mbti-classification")
        self.model = pipeline("text-classification", model="JanSt/albert-base-v2_mbti-classification", tokenizer= self.tokenizer)
        self.resume = resume
        
    def trim_resume_content(self, content):
        limit = 500
        token = '[...]'
        if len(content) <= limit:
            return content
        else:
            return content[:limit - len(token)] + token

    def get_content_from_resume(self):

        pdf_reader = PyPDF2.PdfReader(self.resume)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    
    def predict_personality(self):
        resume_content = self.trim_resume_content(self.get_content_from_resume())
        
        predicted_personality = self.model(resume_content)[0]
        
        return predicted_personality['label']


#HOW TO USE

# with open('/home/rohit-ramkumar/Documents/Resume/Resume/Rohit_Resume_1.pdf', 'rb') as file:
#     pdf_content = file.read()

# pred = PersonalityPredictor(resume=pdf_content)
# pred.predict_personality()