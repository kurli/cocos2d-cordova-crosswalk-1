#!/usr/bin/env python

# Copyright (c) 2013, 2014 Intel Corporation. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
# pylint: disable=F0401

import subprocess
import os
import shutil
import sys

# Build xwalk_core_library
PROJECT_ROOT = os.path.abspath('.')
TEMP_DIR = os.path.join(PROJECT_ROOT, "..", "temp")
XWALK_CORE_LIBRARY_DIR = os.path.join(PROJECT_ROOT, "CordovaLib", "xwalk_core_library", "libs")
dest_apk_dir = os.path.join(PROJECT_ROOT, "..", "apks")
src_apk_dir = os.path.join(PROJECT_ROOT, "bin")
PACKAGE_NAME = os.path.basename(PROJECT_ROOT)
release_dir = os.path.join(PROJECT_ROOT, "..", "..", "build")
assets_dir = os.path.join(PROJECT_ROOT, "assets", "www")

#if not os.path.exists(TEMP_DIR):
#    shutil.copytree(XWALK_CORE_LIBRARY_DIR, TEMP_DIR)
#
#if not os.path.exists(dest_apk_dir):
#    os.mkdir(dest_apk_dir);

os.chdir("./../../")
cmd = "./release.sh -p ./"
result_code = subprocess.call(cmd, shell=True)
if result_code != 0:
  sys.exit(result_code)
os.chdir(PROJECT_ROOT)

if os.path.exists(release_dir):
    for item in os.listdir(release_dir):
      sub_path = os.path.join(release_dir, item)
      dest_dir = os.path.join(assets_dir, item)
      if os.path.isdir(sub_path):
        if os.path.exists(dest_dir):
          shutil.rmtree(dest_dir)
        shutil.copytree(sub_path, dest_dir)
      else:
        shutil.copyfile(sub_path, dest_dir)

cmd = "./cordova/build --gradle"
result_code = subprocess.call(cmd, shell=True)
print 'result_code:', result_code

def BuildAPK(arch):
  if not os.path.exists(os.path.join(XWALK_CORE_LIBRARY_DIR, arch)):
    shutil.copytree(os.path.join(TEMP_DIR, arch), os.path.join(XWALK_CORE_LIBRARY_DIR, arch))

  delarch = "x86"
  if arch == "x86":
    delarch = "armeabi-v7a"

  if os.path.exists(os.path.join(XWALK_CORE_LIBRARY_DIR, delarch)):
    shutil.rmtree(os.path.join(XWALK_CORE_LIBRARY_DIR, delarch))

  result_code = subprocess.call(cmd)
  print 'result_code:', result_code

  if result_code != 0:
    sys.exit(result_code)
  else :
    srcfile = PACKAGE_NAME + "-debug.apk";
    destfile = PACKAGE_NAME + "-" + arch + ".apk"
    shutil.copyfile(os.path.join(src_apk_dir, srcfile), os.path.join(dest_apk_dir, destfile))

#BuildAPK("armeabi-v7a")
#BuildAPK("x86")
