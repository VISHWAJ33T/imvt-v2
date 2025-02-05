import React, { RefObject, use, useEffect, useRef, useState } from 'react'
import Artplayer from 'artplayer'
import artplayerPluginHlsControl from 'artplayer-plugin-hls-control'
import artplayerPluginVttThumbnail from 'artplayer-plugin-thumbnail'
import Hls from 'hls.js'

export default function VideoPlayer({
  media,
  getInstance,
  className,
}: {
  media: {
    urls: { quality: string; url: string }[]
    download?: string | null
    subtitles: { lang: string; url: string }[]
    thumbnail: string
    logo: string
  }
  getInstance?: any
  className: any
}) {
  // const [thumbnail, setThumbnail] = useState(media?.thumbnail || null);
  // console.log(media);

  let SubtitleObj: any
  let QualityObj: any
  let thumbnail: any
  SubtitleObj = media?.subtitles?.map((subtitle: { lang: any; url: any }) => {
    if (subtitle.lang === 'Thumbnails') {
      // setThumbnail(subtitle.url)
      thumbnail = subtitle.url
      return {
        default: false,
        html: 'No Subtitle',
        url: '',
        type: 'vtt',
        encoding: 'utf-8',
        escape: true,
        style: {
          color: '#ffffff',
          'font-size': '1em',
        },
      }
    } else if (subtitle.lang === media?.subtitles[0]?.lang) {
      return {
        default: true,
        html: subtitle.lang,
        url: subtitle.url,
        type: 'vtt',
        encoding: 'utf-8',
        escape: true,
        style: {
          color: '#ffffff',
          'font-size': '1em',
        },
      }
    } else {
      return {
        html: subtitle.lang,
        url: subtitle.url,
        type: 'vtt',
        encoding: 'utf-8',
        escape: true,
        style: {
          color: '#ffffff',
          'font-size': '1em',
        },
      }
    }
  })
  // console.log(thumbnail)
  QualityObj = media?.urls?.map((quality: { quality: string; url: any }) => {
    if (quality?.quality === 'auto') {
      return {
        default: true,
        html: 'Auto',
        url: quality?.url,
      }
    } else {
      return {
        html: quality?.quality || 'Auto',
        url: quality?.url,
      }
    }
  })
  useEffect(() => {
    const art = new Artplayer({
      container: '.artplayer-app',
      url:
        media?.urls && media.urls.length > 0
          ? `${media.urls[media.urls.length - 1].url}`
          : '',
      poster: `${media?.thumbnail}`,
      type: 'm3u8',
      quality: [QualityObj],
      customType: {
        m3u8: function playM3u8(
          video: HTMLMediaElement,
          url: string,
          art: Artplayer
        ) {
          if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy()
            const hls = new Hls()
            hls.loadSource(url)
            hls.attachMedia(video)
            art.hls = hls
            art.on('destroy', () => hls.destroy())
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url
          } else {
            art.notice.show = 'Unsupported playback format: m3u8'
          }
        },
      },
      hotkey: true,
      autoSize: true,
      setting: true,
      plugins: [
        // artplayerPluginHlsQuality({
        //   control: false,
        //   setting: true,
        //   getResolution: (level) => level.height + 'P',
        //   title: 'Auto Quality',
        //   auto: 'Auto',
        // }),
        artplayerPluginHlsControl({
          quality: {
            // Show qualitys in control
            control: true,
            // Show qualitys in setting
            setting: true,
            // Get the quality name from level
            getName: (level: any) => level.height + 'P',
            // I18n
            title: 'Quality',
            auto: 'Auto',
          },
          audio: {
            // Show audios in control
            control: true,
            // Show audios in setting
            setting: true,
            // Get the audio name from track
            getName: (track: any) => track.name,
            // I18n
            title: 'Audio',
            auto: 'Auto',
          },
        }),
        artplayerPluginVttThumbnail({
          // vtt: "./sprite.vtt",
          vtt: thumbnail || null,
        }),
      ],
      volume: 1,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      autoMini: true,
      screenshot: true,
      loop: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: '#23ade5',
      lock: true,
      lang: navigator.language.toLowerCase(),
      moreVideoAttr: {
        crossOrigin: 'anonymous',
        playsInline: true,
      },
      settings: media?.subtitles[0]
        ? [
            {
              width: 200,
              html: 'Subtitle',
              tooltip: `${
                media?.subtitles[0]?.lang === 'Thumbnails'
                  ? 'No Subtitle'
                  : media?.subtitles[0]?.lang
              }`,
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-subtitles"><path d="M7 13h4"/><path d="M15 13h2"/><path d="M7 9h2"/><path d="M13 9h4"/><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>`,
              selector: [
                {
                  html: 'Display',
                  tooltip: 'Show',
                  switch: true,
                  onSwitch: function (item) {
                    item.tooltip = item.switch ? 'Hide' : 'Show'
                    art.subtitle.show = !item.switch
                    return !item.switch
                  },
                },
                ...SubtitleObj,
              ],
              onSelect: function (item) {
                art.subtitle.switch(item.url, {
                  name: item.html,
                })
                return item.html
              },
            },
          ]
        : [],
      subtitle: {
        url: `${media?.subtitles[0]?.url}`,
        type: 'vrt',
        style: {
          color: '#ffffff',
          fontSize: '1em',
        },
        encoding: 'utf-8',
      },
      controls: media.download
        ? [
            {
              html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="white" fill-rule="evenodd" clip-rule="evenodd"><path d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25z"/><path d="M9.657 15.874L7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0M17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z"/></g></svg>`,
              index: 2,
              tooltip: 'Download',
              position: 'right',
              click: function () {
                window.open(media.download as string, '_blank')
              },
            },
          ]
        : [],
      icons: {
        // state: 'play Icon',
        loading: `<img class="w-1/2 max-h-1/2 animate-pulse" src=${media?.logo} alt="Loading" />`,
        indicator:
          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>',
      },
    })

    if (getInstance && typeof getInstance === 'function') {
      getInstance(art)
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false)
      }
    }
  }, [
    thumbnail,
    getInstance,
    QualityObj,
    SubtitleObj,
    media?.urls,
    media?.subtitles,
    media?.thumbnail,
    media?.download,
    media?.logo,
  ])

  return <div className={`artplayer-app ${className}`}></div>
}
