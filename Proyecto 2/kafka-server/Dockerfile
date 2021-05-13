FROM ubuntu:20.04
MAINTAINER Kafka-server-topic
RUN apt-get update
RUN apt-get install default-jdk -y
RUN apt-get install wget -y
RUN wget https://downloads.apache.org/kafka/2.8.0/kafka_2.13-2.8.0.tgz && tar -xvzf kafka_2.13-2.8.0.tgz && cd kafka_2.13-2.8.0
COPY server.properties /kafka_2.13-2.8.0/config/
COPY Init-kafka-server.sh /
RUN chmod +x Init-kafka-server.sh
CMD ["/bin/bash"]
EXPOSE 9092
