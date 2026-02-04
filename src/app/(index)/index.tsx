import PlanetCard from "@/components/planet-card";
import { planets } from "@/data/planets";
import AC from "@bacons/apple-colors";
import { ScrollView, Text, View } from "react-native";

export default function ExploreRoute() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 12 }}
    >
      <View style={{ gap: 4, marginBottom: 8 }}>
        <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>
          Explore our solar system
        </Text>
        <Text style={{ fontSize: 13, color: AC.tertiaryLabel }}>
          Tap a planet to learn more
        </Text>
      </View>
      {planets.map((planet) => (
        <PlanetCard key={planet.id} planet={planet} />
      ))}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}
