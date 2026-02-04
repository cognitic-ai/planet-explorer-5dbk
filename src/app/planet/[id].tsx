import { getPlanetById } from "@/data/planets";
import AC from "@bacons/apple-colors";
import { useLocalSearchParams } from "expo-router";
import Stack from "expo-router/stack";
import { ScrollView, Text, View } from "react-native";
import { SymbolView } from "expo-symbols";

function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 140,
        padding: 14,
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 14,
        borderCurve: "continuous",
        gap: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <SymbolView name={icon as any} size={16} tintColor={AC.secondaryLabel as any} />
        <Text style={{ fontSize: 12, color: AC.secondaryLabel, fontWeight: "500" }}>
          {label}
        </Text>
      </View>
      <Text
        selectable
        style={{ fontSize: 15, color: AC.label, fontWeight: "600" }}
      >
        {value}
      </Text>
    </View>
  );
}

function FactCard({ fact, index }: { fact: string; index: number }) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        padding: 14,
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 14,
        borderCurve: "continuous",
        alignItems: "flex-start",
      }}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: AC.systemBlue,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "white",
            fontVariant: ["tabular-nums"],
          }}
        >
          {index + 1}
        </Text>
      </View>
      <Text
        selectable
        style={{
          flex: 1,
          fontSize: 15,
          color: AC.label,
          lineHeight: 22,
        }}
      >
        {fact}
      </Text>
    </View>
  );
}

export default function PlanetDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const planet = getPlanetById(id);

  if (!planet) {
    return (
      <>
        <Stack.Screen options={{ title: "Not Found" }} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: AC.label }}>Planet not found</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: planet.name }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 20 }}
      >
        {/* Hero Section */}
        <View style={{ alignItems: "center", gap: 12, paddingVertical: 20 }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: planet.color,
              justifyContent: "center",
              alignItems: "center",
              boxShadow: `0 8px 32px ${planet.color}88`,
            }}
          >
            <Text style={{ fontSize: 56 }}>{planet.emoji}</Text>
          </View>
          <Text style={{ fontSize: 14, color: AC.secondaryLabel, fontWeight: "500" }}>
            {planet.subtitle}
          </Text>
        </View>

        {/* Description */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 13, color: AC.secondaryLabel, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 }}>
            About
          </Text>
          <Text
            selectable
            style={{
              fontSize: 16,
              color: AC.label,
              lineHeight: 24,
            }}
          >
            {planet.description}
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 13, color: AC.secondaryLabel, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Quick Facts
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <StatCard icon="ruler" label="Diameter" value={planet.diameter} />
            <StatCard icon="sun.max" label="From Sun" value={planet.distanceFromSun} />
            <StatCard icon="clock" label="Day Length" value={planet.dayLength} />
            <StatCard icon="calendar" label="Year Length" value={planet.yearLength} />
            <StatCard icon="moon" label="Moons" value={planet.moons.toString()} />
            <StatCard icon="thermometer.medium" label="Temperature" value={planet.temperature} />
          </View>
        </View>

        {/* Fun Facts */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 13, color: AC.secondaryLabel, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Did You Know?
          </Text>
          {planet.facts.map((fact, index) => (
            <FactCard key={index} fact={fact} index={index} />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}
