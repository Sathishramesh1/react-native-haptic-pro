#include <jni.h>
#include "hapticproOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::hapticpro::initialize(vm);
}
