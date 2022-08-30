#!/bin/sh
# script to build dream factory app for deployment
#
# Copyright (c) 2019 ICS LLC, Inc.
# This file is licensed under the terms of the MIT license.
# See the file license.txt for more details.

test -f  ./setting.conf || exit 0
. ./setting.conf

#These steps can also be run individually if only that piece is desired. This is often the useful for rebuilding only the Sass:

sencha ant sass
