from sys import argv
from flask import Flask, redirect, url_for, render_template, request

app = Flask(__name__)

def replaces(string, args):
    for key, value in args.items():
        string = string.replace(key,value)
    return string

class htmlElements:
    @staticmethod
    def navbar():
        with open("templates/components/navbar.html","r") as html:
            return replaces(
                html.read(), {
                    "$home":url_for('home'),
                    "$game":url_for('game')
                }
            )

class Urls:
    @staticmethod
    @app.route('/')
    def index():
        return redirect(url_for('home'))

    @staticmethod
    @app.route('/home')
    def home():
        return render_template('home.html', components=htmlElements)
    
    @staticmethod
    @app.route('/game')
    def game():
        challanges = request.args.get('challanges','/static/js/default_challanges.js')
        return render_template('game.html', components=htmlElements, challanges=challanges)

    @staticmethod
    @app.errorhandler(404)
    def page_not_found(error):
        return render_template('404.html', components=htmlElements), 404

if __name__ == "__main__":
    app.run(*argv[1:])
