# Uonet+ request signer for android

[![](https://jitpack.io/v/wulkanowy/uonet-request-signer.svg)](https://jitpack.io/#wulkanowy/uonet-request-signer)

## Instalation

```grovy
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
    }
}

dependencies {
    implementation 'com.github.wulkanowy:uonet-request-signer:android:master-SNAPSHOT'
}
```

## Usage

```kotlin
import io.github.wulkanowy.signer.android.signContent

val signed = signContent(password, certificate, content)
```

## Tests

```bash
$ ./gradlew test
```
