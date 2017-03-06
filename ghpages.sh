#!/bin/bash

if [[ $TRAVIS_BRANCH != 'master' ]]; then
	# Not master branch aborting
  echo "this is not master"
	exit 0
fi
echo "creating build"
yarn ghpages
echo "finished build"
git config --global user.email "$PUSH_EMAIL"
git config --global user.name "Travis CI"
git config --global push.default simple
yarn global add gh-pages
echo "Pushing to github pages"
gh-pages -r "https://$PUSH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git" -d dist -x
