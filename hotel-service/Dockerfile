# Use an official Java 17 image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Build the Spring Boot project
RUN ./mvnw clean install

# Run the app
CMD ["java", "-jar", "target/*.jar"]
