/kafka_2.13-2.8.0/bin/zookeeper-server-start.sh > SERVER_ZOOKEEPER.out 2> SERVER_ZOOKEEPER.err /kafka_2.13-2.8.0/config/zookeeper.properties &
sleep 5
/kafka_2.13-2.8.0/bin/kafka-server-start.sh > SERVER_KAFKA.out 2> SERVER_KAFKA.err /kafka_2.13-2.8.0/config/server.properties &
sleep 10
/kafka_2.13-2.8.0/bin/kafka-topics.sh --zookeeper localhost:2181 --topic KafkaMessages --create --partitions 3 --replication-factor 1









