plugins {
    kotlin("jvm") version "2.2.21"
    application
}

group = "org.aincraft"
version = "1.0-SNAPSHOT"

application {
    mainClass.set("org.aincraft.MainKt")
}

repositories {
    mavenCentral()
    maven("https://repo.papermc.io/repository/maven-public/")
}

dependencies {
    testImplementation(kotlin("test"))
    compileOnly("io.papermc.paper:paper-api:1.21.4-R0.1-SNAPSHOT")
}

kotlin {
    jvmToolchain(21)
}

tasks.test {
    useJUnitPlatform()
}