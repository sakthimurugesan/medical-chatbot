import pandas as pd
import nltk
import pickle
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.classify import NaiveBayesClassifier
from nltk.classify.util import accuracy
from nltk.stem import WordNetLemmatizer
from sklearn.model_selection import train_test_split

# # Download required NLTK resources if not already available
# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')

# Load data from mega.csv
data = pd.read_csv('mega.csv', delimiter='|')

# Initialize a lemmatizer
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Preprocess the text: tokenize, remove stop words, and lemmatize
def preprocess(text):
    words = word_tokenize(text.lower())
    filtered_words = [lemmatizer.lemmatize(w) for w in words if w.isalpha() and w not in stop_words]
    return filtered_words

# Prepare data for training
def get_features(words):
    return {word: True for word in words}

# Label and features preparation
data['features'] = data['dialogue'].apply(preprocess)
data_tuples = [(get_features(dialogue), tag) for dialogue, tag in zip(data['features'], data['tag'])]

# Split data into training and testing sets
train_data, test_data = train_test_split(data_tuples, test_size=0.2, random_state=42)

# Train the Naive Bayes Classifier
classifier = NaiveBayesClassifier.train(train_data)

# Evaluate the classifier accuracy
print(f"Training Accuracy: {accuracy(classifier, train_data) * 100:.2f}%")
print(f"Testing Accuracy: {accuracy(classifier, test_data) * 100:.2f}%")

# Save the trained model to a pickle file
with open('model5.pkl', 'wb') as model_file:
    pickle.dump(classifier, model_file)

print("Model saved as naive_bayes_model.pkl")

# Define a function to predict the tag based on the input dialogue
def predict_tag(dialogue):
    processed_features = get_features(preprocess(dialogue))
    return classifier.classify(processed_features)

# Test the prediction function
test_input = "I need a neurologist"
predicted_tag = predict_tag(test_input)
print(f"Predicted tag for '{test_input}': {predicted_tag}")
