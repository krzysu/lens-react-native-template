import {Profile} from '@lens-protocol/react-native';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

type ProfileAvatarProps = {
  profile: Profile;
};

function ProfileAvatar({profile}: ProfileAvatarProps) {
  const uri =
    profile.metadata?.picture?.__typename === 'ImageSet'
      ? profile.metadata.picture.optimized?.uri
      : undefined;

  return (
    <View style={styles.avatarContainer}>
      {uri ? (
        <Image
          source={{
            uri,
          }}
          style={styles.avatarImage}
          alt="profile image"
        />
      ) : (
        <Text style={styles.avatarFallbackText}>
          {profile.handle?.localName ?? profile.ownedBy.address}
        </Text>
      )}
    </View>
  );
}

function Ticker({children}: {children: React.ReactNode}) {
  return <View style={styles.ticker}>{children}</View>;
}

export type MyProfileProps = {
  profile: Profile;
};

export function MyProfile({profile}: MyProfileProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <ProfileAvatar profile={profile} />
        <View style={styles.column}>
          <Text style={styles.heading}>
            {profile.metadata?.displayName ?? profile.handle?.fullHandle}
          </Text>
          {profile.metadata?.displayName && (
            <Text style={styles.subHeading}>{profile.handle?.fullHandle}</Text>
          )}
        </View>
      </View>
      <View style={[styles.row, styles.statsContainer]}>
        <Ticker>
          <Text style={styles.statHeading}>{profile.stats.posts}</Text>
          <Text style={styles.statText}>posts</Text>
        </Ticker>

        <View style={styles.divider} />

        <Ticker>
          <Text style={styles.statHeading}>{profile.stats.followers}</Text>
          <Text style={styles.statText}>followers</Text>
        </Ticker>

        <View style={styles.divider} />

        <Ticker>
          <Text style={styles.statHeading}>{profile.stats.following}</Text>
          <Text style={styles.statText}>following</Text>
        </Ticker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 12,
    maxWidth: 360,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    marginLeft: 16,
  },
  avatarContainer: {
    marginRight: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: {
    fontFamily: 'System',
    fontSize: 20,
    color: '#fff',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: 'System',
  },
  statsContainer: {
    marginTop: 24,
    justifyContent: 'space-between',
  },
  ticker: {
    alignItems: 'center',
    flex: 1,
  },
  statHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  statText: {
    fontSize: 14,
    fontFamily: 'System',
  },
  divider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
});
