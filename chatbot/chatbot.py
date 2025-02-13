import json
import random
import nltk
import pandas as pd
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords
from nltk.classify import NaiveBayesClassifier
from nltk.stem.snowball import SnowballStemmer
import pickle
import warnings
import textblob
warnings.filterwarnings("ignore")
from difflib import SequenceMatcher

# Load Data from combine.csv and data.json
data_csv = pd.read_csv('mega.csv', delimiter='|')
data_json = json.load(open('data.json'))

# Store tag information from data.json (since it only has tags, no intents)
classes = data_json['tags']
def match_percentage(input_text, prediction):
    # Calculate similarity ratio using SequenceMatcher
    similarity = SequenceMatcher(None, input_text, prediction).ratio()
    # Convert ratio to percentage
    return similarity * 100
# Preprocessing Function
def preprocess(sentence):
    sentence = sentence.lower()
    tokenizer = RegexpTokenizer(r'\w+')
    tokens = tokenizer.tokenize(sentence)
    filtered_words = [w for w in tokens if w not in stopwords.words("english")]
    return filtered_words

# Extract Features
def extract_tagged(sentences):
    features = []
    for tagged_words in sentences:
        word, tag = tagged_words
        if tag in ['NN',  "VBP",'NNS', 'RB', "VBN",  'PRP', 'JJ','VB','VBG']:
            features.append(word)
            print(word," ",tag)
    return features

def extract_feature(text):
    words = preprocess(text)
    tag = nltk.pos_tag(words)
    extract_features = extract_tagged(tag)
    stemmer = SnowballStemmer("english")
    stemmed_words = [stemmer.stem(x) for x in extract_features]
    print(stemmed_words)
    lmtz = WordNetLemmatizer()
    result = [lmtz.lemmatize(x) for x in stemmed_words]
    print(result)
    return result

def word_feats(words):
    return dict([(word, True) for word in words])

# Load the trained model from the file
with open('model4.pkl', 'rb') as model_file:
    loaded_classifier = pickle.load(model_file)

print("Model loaded from model5.pkl")

# Predict Intent Class
def pred_class(text, classifier):
    features = extract_feature(text)
    
    if features == []:
        return "greeting"
    
    stemmer = SnowballStemmer("english")
    
    # Keywords related to appointment scheduling
    appointment_keywords = [
        "Appointment", "Booking", "Consultation", "Meeting", "Schedule", "Visit", "Check-up",
        "Session", "Reservation", "Time slot", "Booking request", "Slot", "Arrange", "Set up",
        "Confirm", "Plan", "Register", "Make an appointment", "Fix an appointment", "Organize",
        "Reserve", "Plan a visit", "Set a meeting", "Schedule a session", "Book a slot",
        "Secure a time", "Arrange a consultation", "Book a meeting", "Set up a check-up",
        "Fix a slot", "Request an appointment", "Schedule a consultation", "Organize a visit",
        "Confirm a booking", "Reserve a session", "Plan a check-up", "Book an appointment",
        "Schedule a time", "Confirm a meeting", "Secure a slot", "Arrange a session",
        "Register for an appointment", "Set up a reservation", "Book a visit", "Request a meeting",
        "Fix a consultation", "Organize a session", "Schedule a slot", "Reserve a check-up",
        "Confirm a visit","need","visit","doctor","see","need","meet","doctor","problem"
    ]
    
    # Stem the appointment keywords
    appointment_keywords = [stemmer.stem(x.lower()) for x in appointment_keywords]
    
    # Medical terms
    medical_terms = ["brain", "kidney", "lung", "heart", "liver", "child", "dentist", "skin", "teeth"]
    
    # Remove appointment-related words from features
    filtered_features = [word for word in features if stemmer.stem(word.lower()) not in appointment_keywords]
    print(filtered_features)
    sent=''
    for i in filtered_features:
        sent+=i+' '
    # print(match_percentage(sent))
    if filtered_features==[]:
        return "greeting"
    # Check if any medical term is present in the filtered features
    if any(term in filtered_features for term in medical_terms):
        a=(classifier.classify(word_feats(filtered_features)))
        print('A\t',a)
        return a
    elif any(keyword in filtered_features for keyword in appointment_keywords):
        # Default to 'greeting' if no specific medical tag is found
        return 'greeting'
    else:
        # If no relevant terms, classify normally
        a=(classifier.classify(word_feats(filtered_features)))
        print('A\t',a)
        return a

# Get Response from combine.csv
def get_response(tag, data_csv):
    response_df = data_csv[data_csv['tag'] == tag]
    if not response_df.empty:
        return random.choice(response_df['response'].tolist())
    else:
        return "Sorry! I don't understand."

# Chatbot Interaction Loop
def chat():
    print("Hello! I'm your chatbot. Type 'exit' to end the conversation.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Goodbye!")
            break
        print(user_input)
        predicted_tag = pred_class(user_input, loaded_classifier)
        response = get_response(predicted_tag, data_csv)
        print(f"Bot: {response}")

if __name__ == "__main__":
    chat()