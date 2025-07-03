# Use official Java 17 image
FROM eclipse-temurin:17-jdk

# Set working directory inside container
WORKDIR /app

# Copy all files from your local project to the container
COPY . .

# Make mvnw executable
RUN chmod +x ./mvnw

# Build the project, skip tests to speed up
RUN ./mvnw clean package -DskipTests

# Run the jar file
CMD ["java", "-jar", "target/hotel-service-0.0.1-SNAPSHOT.jar"]
