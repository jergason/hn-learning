#HN Learning

This was a fun projec to play with machine learning in JavaScript.

It uses [credulous](https://github.com/jergason/credulous.git), a Naive Bayes model
written in JavaScript, to build up a model for classifying posts as interesting or uninteresting.

##Installation

You need [node.js](http://nodejs.org) and [mongodb](http://mongodb.org) installed already.

From inside the hn-learning directory, run:

```bash
npm install
npm install -g jake
mongod & #start mongodb in the background
```


##Using It

Run `jake -T` to see the Jake tasks. This will get you started rating posts.

```bash
jake load_from_hnarchive # seed the database with stuff
node lib/commandLineRater.js #begin rating posts
```

Once you want to classify new posts, run `node lib/recommendNewPosts.js`. This
will pull 30 posts from the [Hacker News new page](http://news.ycombinator.com/newest) and
recommend ones to you that are recommended by the model.
