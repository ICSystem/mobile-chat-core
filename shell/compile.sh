#!/bin/sh
# script to build dream factory app for deployment
#
# Copyright (c) 2013 Modus Create, Inc.
# This file is licensed under the terms of the MIT license.
# See the file license.txt for more details.

test -f ./setting.conf || exit 0
. ./setting.conf

cd ../

sencha_compile
