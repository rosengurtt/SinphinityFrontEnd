export class GeneralMidiInstrument {

    static GetInstrumentName(instrumentCode: number): string {
        switch (instrumentCode) {
            case 0: return 'Acoustic Grand Piano';
            case 1: return 'Bright Piano';
            case 2: return 'Electric Grand Piano';
            case 3: return 'Honky Tonk Piano';
            case 4: return 'Electric Piano 1';
            case 5: return 'Electric Piano 2';
            case 6: return 'Harpsichord';
            case 7: return 'Clavi';
            case 8: return 'Celesta';
            case 9: return 'Glockenspiel';
            case 10: return 'Music Box';
            case 11: return 'Vibraphone';
            case 12: return 'Marimba';
            case 13: return 'Xylophone';
            case 14: return 'Tubular Bells';
            case 15: return 'Dulcimer';
            case 16: return 'Drawbar Organ';
            case 17: return 'Percussive Organ';
            case 18: return 'Rock Organ';
            case 19: return 'Church Organ';
            case 20: return 'Reed Organ';
            case 21: return 'Accordion';
            case 22: return 'Harmonica';
            case 23: return 'Tango Accordion';
            case 24: return 'Acoustic Guitar Nylon';
            case 25: return 'Acoustic Guitar Steel';
            case 26: return 'Electric Guitar Jazz';
            case 27: return 'Electric Guitar Clean';
            case 28: return 'Electric Guitar Muted';
            case 29: return 'Overdriven Guitar';
            case 30: return 'Distortion Guitar';
            case 31: return 'Guitar harmonics';
            case 32: return 'Acoustic Bass';
            case 33: return 'Electric Bass Finger';
            case 34: return 'Electric Bass Pic';
            case 35: return 'Fretless Bass';
            case 36: return 'Slap Bass 1';
            case 37: return 'Slap Bass 2';
            case 38: return 'Synth Bass 1';
            case 39: return 'Synth Bass 2';
            case 40: return 'Violin';
            case 41: return 'Viola';
            case 42: return 'Cello';
            case 43: return 'Contrabass';
            case 44: return 'Tremolo Strings';
            case 45: return 'Pizzicato Strings';
            case 46: return 'Orchestral Harp';
            case 47: return 'Timpani';
            case 48: return 'String Ensemble 1';
            case 49: return 'String Ensemble 2';
            case 50: return 'Synth Strings 1';
            case 51: return 'Synth Strings 2';
            case 52: return 'Choir Aahs';
            case 53: return 'Voice Oohs';
            case 54: return 'Synth Voice';
            case 55: return 'Orchestra Hit';
            case 56: return 'Trumpet';
            case 57: return 'Trombone';
            case 58: return 'Tuba';
            case 59: return 'Muted Trumpet';
            case 60: return 'French Horn';
            case 61: return 'Brass Section';
            case 62: return 'Synth Brass 1';
            case 63: return 'Synth Brass 2';
            case 64: return 'Soprano Sax';
            case 65: return 'Alto Sax';
            case 66: return 'Tenor Sax';
            case 67: return 'Baritone Sax';
            case 68: return 'Oboe';
            case 69: return 'English Horn';
            case 70: return 'Bassoon';
            case 71: return 'Clarinet';
            case 72: return 'Piccolo';
            case 73: return 'Flute';
            case 74: return 'Recorder';
            case 75: return 'Pan Flute';
            case 76: return 'Blown Bottle';
            case 77: return 'Shakuhachi';
            case 78: return 'Whistle';
            case 79: return 'Ocarina';
            case 80: return 'Lead 1 Square';
            case 81: return 'Lead 2 Sawtooth';
            case 82: return 'Lead 3 Calliope';
            case 83: return 'Lead 4 Chiff';
            case 84: return 'Lead 5 Charang';
            case 85: return 'Lead 6 Voice';
            case 86: return 'Lead 7 Fifths';
            case 87: return 'Lead 8 BassLead';
            case 88: return 'Pad 1 Newage';
            case 89: return 'Pad 2 Warm';
            case 90: return 'Pad 3 Polysynth';
            case 91: return 'Pad 4 Choir';
            case 92: return 'Pad 5 Bowed';
            case 93: return 'Pad 6 Metallic';
            case 94: return 'Pad 7 Halo';
            case 95: return 'Pad 8 Sweep';
            case 96: return 'FX1 Rain';
            case 97: return 'FX2 Soundtrack';
            case 98: return 'FX3 Crystal';
            case 99: return 'FX 4 Atmosphere';
            case 100: return 'FX5 Brightness';
            case 101: return 'FX6 Goblins';
            case 102: return 'FX7 Echoes';
            case 103: return 'FX8 SciFi';
            case 104: return 'Sitar';
            case 105: return 'Banjo';
            case 106: return 'Shamisen';
            case 107: return 'Koto';
            case 108: return 'Kalimba';
            case 109: return 'Bagpipe';
            case 110: return 'Fiddle';
            case 111: return 'Shanai';
            case 112: return 'Tinkle Bell';
            case 113: return 'Agogo';
            case 114: return 'Steel Drums';
            case 115: return 'Woodblock';
            case 116: return 'Taiko Drum';
            case 117: return 'Melodic Tom';
            case 118: return 'Synth Drum';
            case 119: return 'Reverse Cymbal';
            case 120: return 'GuitarFretNoise';
            case 121: return 'BreathNoise';
            case 122: return 'Seashore';
            case 123: return 'BirdTweet';
            case 124: return 'TelephoneRing';
            case 125: return 'Helicopter';
            case 126: return 'Applause';
            case 127: return 'Gunshot';
        }
        return 'Invalid instrument code';
    }
}