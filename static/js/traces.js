// one object with a dict 
var traces = {
    "1": {
        "statement": "What is 2 + 2?",
        "gold_answer": 781, 
        "models": {
            "o1": 
                [{
                    "idx": 0,
                    "response": "Thinking...answer is \boxed{123}.",
                    "parsed_answer": 123 
                },{
                    "idx": 1,
                    "response": "Thinking...answer is \boxed{123}.",
                    "parsed_answer": 123 
                },
                ]
            , 
            "deepseek": [] 
        }
    }
}