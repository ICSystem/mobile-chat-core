#!/bin/sh
# script to build dream factory app for deployment
#
# Copyright (c) 2019 ICS LLC, Inc.
# This file is licensed under the terms of the MIT license.
# See the file license.txt for more details.

#cd ../
#rm -r -f ./build/*
#sencha app build production 
#  and concat -yui ./build/app.min.js 

test -f ./setting.conf || exit 0
. ./setting.conf

cd ./../

production

