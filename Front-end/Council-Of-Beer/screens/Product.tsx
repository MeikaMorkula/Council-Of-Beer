import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StarRatingDisplay } from "react-native-star-rating-widget";

type Review = {
  id: string;
  username: string;
  rating: number;
  text: string;
};

const TAGS = ["Lager", "Malt", "Crisp", "Stout", "Porter", "Classic"];

const REVIEWS: Review[] = [
  { id: "1", username: "@kalianjuoja", rating: 4.5, text: "on hyvettiä" },
  { id: "2", username: "@kaliaherra", rating: 5, text: "guunaa suussa" },
  { id: "3", username: "@kalialainen", rating: 1, text: "rimmeriä" },
];

export default function ProductPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.postHeader}>
        <Image style={styles.userPfp} />
        <Text style={styles.postUsrname}>@brewery</Text>
      </View>

      <View style={styles.postImgCont}>
        <Image
          style={styles.postImg}
          resizeMode="contain"
          source={{
            uri: "https://www.sinebrychoff.fi/globalassets/tuotteet/beer/sandels/sandels_033.png",
          }}
        />
      </View>

      <View style={styles.postBeerInfoCont}>
        <View style={styles.infoRow}>
          <Text style={styles.mainInfoText}>Sandels, </Text>
          <StarRatingDisplay
            rating={4}
            starSize={22}
            starStyle={styles.productRating}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.subInfoText}>4.7%, </Text>
          <Text style={styles.subInfoText}>Olvi</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.subInfoText}>Finland</Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        {TAGS.map((tag) => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add-circle" size={20} color="#EDE9C7" />
        <Text style={styles.addBtnText}>Add to collection</Text>
      </TouchableOpacity>

      <View style={styles.postReviewCont}>
        <Text style={styles.reviewTitle}>Reviews</Text>

        {REVIEWS.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeaderRow}>
              <Text style={styles.reviewUser}>{review.username}</Text>
              <StarRatingDisplay
                rating={review.rating}
                starSize={16}
                starStyle={styles.reviewRating}
              />
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D190E",
  },
  postHeader: {
    flexDirection: "row",
  },
  userPfp: {
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    width: 45,
    height: 45,
    margin: 10,
  },
  postUsrname: {
    color: "#EDE9C7",
    fontSize: 18,
    textAlignVertical: "center",
  },
  postImgCont: {
    height: 360,
    backgroundColor: "#926C43",
    justifyContent: "center",
  },
  postImg: {
    height: "100%",
    width: "100%",
  },
  postBeerInfoCont: {
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
  },
  mainInfoText: {
    color: "#EDE9C7",
    fontSize: 24,
  },
  subInfoText: {
    color: "#EDE9C7",
    fontSize: 20,
  },
  productRating: {
    marginHorizontal: 2,
    marginTop: 5,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 8,
  },
  tagChip: {
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#28200C",
  },
  tagText: {
    color: "#EDE9C7",
    fontSize: 13,
  },
  addBtn: {
    marginTop: 14,
    marginHorizontal: 20,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#28200C",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addBtnText: {
    color: "#EDE9C7",
    fontSize: 14,
    marginLeft: 8,
  },
  postReviewCont: {
    padding: 20,
  },
  reviewTitle: {
    color: "#EDE9C7",
    fontSize: 24,
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: "#28200C",
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  reviewHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewUser: {
    color: "#EDE9C7",
    fontSize: 16,
    marginBottom: 4,
  },
  reviewRating: {
    marginHorizontal: 1,
  },
  reviewText: {
    color: "#EDE9C7",
    fontSize: 15,
    marginTop: 4,
  },
});
