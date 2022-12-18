import Image from 'next/image'
import logoImgLg from '../../assets/weirds-white-logo-lg.png'

import twitterLogo from '../../assets/social-medias/twitter.svg'
import linkedinLogo from '../../assets/social-medias/linkedin.svg'
import discordLogo from '../../assets/social-medias/discord.svg'
import Link from 'next/link'

export function Footer() {
  const socialMedias = [
    { name: 'Linkedin', logo: linkedinLogo, href: '' },
    { name: 'Twitter', logo: twitterLogo, href: '' },
    { name: 'Discord', logo: discordLogo, href: '' },
  ]

  return (
    <footer className="w-screen bg-gray700">
      <div className="max-w-[1440px] w-full flex items-stretch justify-between py-10 px-4 lg:px-8 mt-48 mx-auto">
        <Image src={logoImgLg} alt="Logo da Weirds" />
        <div className="max-w-[256px] w-full flex flex-col text-sm">
          <strong className="font-bold">FALE CONOSCO</strong>
          <input
            className="mt-4 px-4 py-2 w-full bg-gray900 placeholder:text-gray700 focus:outline-none"
            type="text"
            placeholder="E-mail"
          />
          <button className="mt-2 py-2 w-full font-bold text-center bg-gray900">
            ENVIAR
          </button>
        </div>
        <div className="max-w-[256px] w-full flex flex-col justify-end">
          <ul className="flex gap-8 items-center justify-end">
            {socialMedias.map((social) => {
              return (
                <li key={social.name}>
                  <Link href={social.href}>
                    <Image src={social.logo} alt={`Logo do ${social.name}`} />
                  </Link>
                </li>
              )
            })}
          </ul>
          <span className="mt-auto font-bold text-gray100 text-sm">
            @WEIRDBAND | All Rigths Reserverd
          </span>
        </div>
      </div>
    </footer>
  )
}
