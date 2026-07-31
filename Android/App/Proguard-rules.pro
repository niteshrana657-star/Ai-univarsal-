# ============================================================
# Universal AI Operating Companion
# ProGuard / R8 Rules
# ============================================================

# Preserve source and line information for debugging
-keepattributes SourceFile,LineNumberTable

# Keep annotations
-keepattributes *Annotation*

# Keep Kotlin metadata
-keep class kotlin.Metadata { *; }

# Keep application classes
-keep class com.universalai.companion.** { *; }

# Keep Activities
-keep public class * extends android.app.Activity

# Keep Services
-keep public class * extends android.app.Service

# Keep Broadcast Receivers
-keep public class * extends android.content.BroadcastReceiver

# Keep Content Providers
-keep public class * extends android.content.ContentProvider

# Keep Accessibility Services
-keep class * extends android.accessibilityservice.AccessibilityService { *; }

# Keep Notification Listener Services
-keep class * extends android.service.notification.NotificationListenerService { *; }

# Keep ViewBinding classes
-keep class **Binding { *; }

# Keep enum values
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Preserve Serializable implementations
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Don't warn for Kotlin internals
-dontwarn kotlin.**

# Don't warn for AndroidX
-dontwarn androidx.**

# Optimize code
-optimizationpasses 5

# Remove logging in release builds
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}
