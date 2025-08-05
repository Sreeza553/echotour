import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecordingControls = ({ onRecordingComplete, isBlending }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const animationRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    return () => {
      if (timerRef?.current) clearInterval(timerRef?.current);
      if (animationRef?.current) cancelAnimationFrame(animationRef?.current);
      if (streamRef?.current) {
        streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      }
    };
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      let stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermissionGranted(true);
      setPermissionDenied(false);
      
      // Setup audio context for level monitoring
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef?.current?.createAnalyser();
      const source = audioContextRef?.current?.createMediaStreamSource(stream);
      source?.connect(analyserRef?.current);
      analyserRef.current.fftSize = 256;
      
      return stream;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setPermissionDenied(true);
      setPermissionGranted(false);
      return null;
    }
  };

  const startRecording = async () => {
    let stream = streamRef?.current;
    
    if (!stream) {
      stream = await requestMicrophonePermission();
      if (!stream) return;
    }

    try {
      chunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data?.size > 0) {
          chunksRef?.current?.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);
        setHasRecording(true);
        if (onRecordingComplete) {
          onRecordingComplete(audioUrl, blob);
        }
      };

      mediaRecorderRef?.current?.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Start audio level monitoring
      monitorAudioLevel();
      
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef?.current && isRecording) {
      mediaRecorderRef?.current?.pause();
      setIsPaused(true);
      if (timerRef?.current) clearInterval(timerRef?.current);
      if (animationRef?.current) cancelAnimationFrame(animationRef?.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef?.current && isPaused) {
      mediaRecorderRef?.current?.resume();
      setIsPaused(false);
      
      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Resume audio level monitoring
      monitorAudioLevel();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef?.current) {
      mediaRecorderRef?.current?.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef?.current) clearInterval(timerRef?.current);
      if (animationRef?.current) cancelAnimationFrame(animationRef?.current);
      setAudioLevel(0);
    }
  };

  const monitorAudioLevel = () => {
    if (!analyserRef?.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateLevel = () => {
      analyserRef?.current?.getByteFrequencyData(dataArray);
      const average = dataArray?.reduce((a, b) => a + b) / dataArray?.length;
      setAudioLevel(Math.min(100, (average / 255) * 100));
      
      if (isRecording && !isPaused) {
        animationRef.current = requestAnimationFrame(updateLevel);
      }
    };
    
    updateLevel();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const clearRecording = () => {
    setHasRecording(false);
    setRecordingTime(0);
    if (onRecordingComplete) {
      onRecordingComplete(null, null);
    }
  };

  if (permissionDenied) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
        <div className="text-center">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MicOff" size={32} className="text-error" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Microphone Access Required
          </h3>
          <p className="text-muted-foreground mb-4">
            Please allow microphone access to record your voice memories.
          </p>
          <Button
            variant="default"
            onClick={requestMicrophonePermission}
            iconName="Mic"
            iconPosition="left"
          >
            Grant Permission
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Voice Recording
        </h2>
        <p className="text-muted-foreground">
          Record your travel memories and thoughts
        </p>
      </div>
      {/* Recording Status */}
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className={`w-3 h-3 rounded-full ${
            isRecording && !isPaused ? 'bg-error animate-pulse' : hasRecording ?'bg-success' : 'bg-muted'
          }`} />
          <span className="text-sm font-medium text-foreground">
            {isRecording && !isPaused ? 'Recording...' : isPaused ?'Paused': hasRecording ?'Recording Complete' : 'Ready to Record'}
          </span>
        </div>

        {/* Timer */}
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-foreground mb-2">
            {formatTime(recordingTime)}
          </div>
        </div>

        {/* Audio Level Indicator */}
        {(isRecording || isPaused) && (
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Audio Level</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-success to-warning h-2 rounded-full transition-all duration-100"
                style={{ width: `${audioLevel}%` }}
              />
            </div>
          </div>
        )}

        {/* Waveform Visualization */}
        {(isRecording || isPaused) && (
          <div className="flex items-center justify-center space-x-1 mb-4">
            {Array.from({ length: 20 })?.map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-primary rounded-full transition-all duration-100 ${
                  isRecording && !isPaused ? 'animate-pulse' : ''
                }`}
                style={{
                  height: `${Math.max(4, (audioLevel / 100) * 32 + Math.random() * 16)}px`,
                  animationDelay: `${i * 50}ms`
                }}
              />
            ))}
          </div>
        )}
      </div>
      {/* Recording Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {!isRecording && !hasRecording && (
          <Button
            variant="default"
            size="lg"
            onClick={startRecording}
            disabled={isBlending}
            iconName="Mic"
            iconPosition="left"
            className="min-h-touch"
          >
            Start Recording
          </Button>
        )}

        {isRecording && !isPaused && (
          <>
            <Button
              variant="warning"
              size="lg"
              onClick={pauseRecording}
              iconName="Pause"
              iconPosition="left"
              className="min-h-touch"
            >
              Pause
            </Button>
            <Button
              variant="destructive"
              size="lg"
              onClick={stopRecording}
              iconName="Square"
              iconPosition="left"
              className="min-h-touch"
            >
              Stop
            </Button>
          </>
        )}

        {isPaused && (
          <>
            <Button
              variant="success"
              size="lg"
              onClick={resumeRecording}
              iconName="Play"
              iconPosition="left"
              className="min-h-touch"
            >
              Resume
            </Button>
            <Button
              variant="destructive"
              size="lg"
              onClick={stopRecording}
              iconName="Square"
              iconPosition="left"
              className="min-h-touch"
            >
              Stop
            </Button>
          </>
        )}

        {hasRecording && !isRecording && (
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="lg"
              onClick={clearRecording}
              disabled={isBlending}
              iconName="Trash2"
              iconPosition="left"
              className="min-h-touch"
            >
              Clear
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={startRecording}
              disabled={isBlending}
              iconName="RotateCcw"
              iconPosition="left"
              className="min-h-touch"
            >
              Re-record
            </Button>
          </div>
        )}
      </div>
      {/* Recording Tips */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Recording Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Speak clearly and at a normal volume</li>
              <li>• Find a quiet environment for best quality</li>
              <li>• Keep recordings under 5 minutes for optimal blending</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingControls;