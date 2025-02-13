dataset = [
    {"Sky": "Sunny", "AirTemp": "Warm", "Humidity": "Normal", "Wind": "Strong", "Water": "Warm", "Forecast": "Same", "EnjoySport": "Yes"},
    {"Sky": "Sunny", "AirTemp": "Warm", "Humidity": "High", "Wind": "Strong", "Water": "Warm", "Forecast": "Same", "EnjoySport": "Yes"},
    {"Sky": "Rainy", "AirTemp": "Cold", "Humidity": "High", "Wind": "Strong", "Water": "Warm", "Forecast": "Change", "EnjoySport": "No"},
    {"Sky": "Sunny", "AirTemp": "Warm", "Humidity": "High", "Wind": "Strong", "Water": "Cool", "Forecast": "Change", "EnjoySport": "Yes"},
]
initial_positive_example = next(example for example in dataset if example["EnjoySport"] == "Yes")
hypothesis = {key: value for key, value in initial_positive_example.items() if key != "EnjoySport"}
for example in dataset:
    if example["EnjoySport"] == "Yes":
        for attribute, value in hypothesis.items():
            if example[attribute] != value:
                hypothesis[attribute] = "?"
print("Maximally Specific Hypothesis:", hypothesis)