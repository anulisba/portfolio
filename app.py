from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Establish the MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['projectnlp']
users = db.users
# Print a message when the connection is established
print("Connected to MongoDB")

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nlp')
def nlp():
    return render_template('nlp.html')

@app.route('/skind')
def skind():
    return render_template('skind.html')


@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json or request.form.to_dict()
        print("Received data:", data)
        user = {
            'username': data['username'],
            'email': data['email'],
            'password': data['password']
        }
        users.insert_one(user)

        return jsonify(success=True, message='User signed up successfully')
    except Exception as e:
        print("Error during signup:", str(e))
        return jsonify(success=False, message='Error during signup'), 500


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = users.find_one({'email': data.get('email'), 'password': data.get('password')})

        if user:
            print("found")
            return jsonify({'success': True, 'message': 'Login successful', 'username': user.get('username')})
        else:
            print("not found")
            print(user)
            return jsonify({'success': False, 'message': 'Invalid credentials'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/comment', methods=['POST'])
def add_comment():
    data = request.json
    comments = db.comments
    comment = {
        'username': data['username'],
        'text': data['text']
    }
    comments.insert_one(comment)
    print("Comment added successfully in MongoDB")
    return jsonify(success=True, message='Comment added successfully')

if __name__ == '__main__':
    app.run(debug=True)
