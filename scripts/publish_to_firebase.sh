#!/usr/bin/env sh

set -e
set -x

if [ $# -eq 0 ]; then
    current_directory=$(dirname "$0")
else
    current_directory="$1"
fi

cd $current_directory

export VERSION="$(jq -r '.version' < "./build_details.json")"
export BASE_IMAGE="$(jq -r '.docker_image_tag' < "./build_details.json")"

docker build \
    --build-arg BASE_IMAGE=$BASE_IMAGE \
    --build-arg VERSION=$VERSION \
    --build-arg FIREBASE_TOKEN=$FIREBASE_TOKEN \
    --build-arg FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID \
    --build-arg FIREBASE_RESOURCE_NAME=$FIREBASE_RESOURCE_NAME \
    --build-arg API_GATEWAY_PUBLIC_URL=$API_GATEWAY_PUBLIC_URL \
    --build-arg AUTH0_DOMAIN=$AUTH0_DOMAIN \
    --build-arg AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID \
    --build-arg GOOGLE_MAP_API_KEY=$GOOGLE_MAP_API_KEY \
    --build-arg IPINFO_ACCESS_TOKEN=$IPINFO_ACCESS_TOKEN \
    -f ./Dockerfile.firebase .
