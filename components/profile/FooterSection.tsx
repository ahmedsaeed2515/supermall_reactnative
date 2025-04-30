import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useAppTheme } from '../../hooks/useAppTheme';

const socialLinks = [
  { icon: 'github', url: 'https://github.com/yourusername' },
  { icon: 'linkedin-square', url: 'https://linkedin.com/in/yourprofile' },
  { icon: 'twitter', url: 'https://twitter.com/yourhandle' },
  { icon: 'medium', url: 'https://medium.com/@yourhandle' },
  { icon: 'code', url: 'https://dev.to/yourhandle' }
];

export const FooterSection = () => {
  const { colors } = useAppTheme();

  const handleLinkPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleResumeDownload = async () => {
    // Replace with your actual resume URL
    const resumeUrl = 'https://your-website.com/resume.pdf';
    const supported = await Linking.canOpenURL(resumeUrl);
    if (supported) {
      await Linking.openURL(resumeUrl);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.socialLinks}>
        {socialLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleLinkPress(link.url)}
            style={styles.socialButton}
          >
            <FontAwesome 
              // name={link.icon} 
              size={24} 
              color={colors.primary} 
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.downloadButton, { backgroundColor: colors.primary }]}
        onPress={handleResumeDownload}
      >
        <FontAwesome name="download" size={20} color="white" />
        <ThemedText style={styles.downloadText}>
          Download Resume
        </ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.copyright}>
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 24,
  },
  downloadText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  copyright: {
    fontSize: 12,
    opacity: 0.6,
  },
});