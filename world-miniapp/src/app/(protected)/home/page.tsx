import { auth } from '@/auth';
import { NFCSigner } from '@/components/NFCSigner';
import { Page } from '@/components/PageLayout';
import { Marble, TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { EventList } from '@/components/EventList';
import { DaySelector } from '@/components/DaySelector/DaySelector';
import { User } from 'iconoir-react';
import { MiniKit } from '@worldcoin/minikit-js';
import { http } from 'viem'
import { mainnet } from 'viem/chains';
import { createEnsPublicClient } from '@ensdomains/ensjs'
import { HomeContent } from './HomeContent';

export default async function Home() {
  const session = await auth();

  if (!session?.user?.username) return <></>;

  const { walletAddress } = await MiniKit.getUserByUsername(session?.user!.username!);
  const client = createEnsPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const result = await client.getName({
    address: walletAddress as `0x${string}`,
  });

  const ensOrAddress = result?.name ? result.name : session?.user!.username;
  return (
    <>
      <Page.Header className="p-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <TopBar
          title="vibe-it"
          endAdornment={

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 capitalize">
                   {ensOrAddress}
                </p>
                <p className="text-xs text-gray-500">
                  Welcome back!
                </p>
              </div>
              
              <div className="relative">
                 {session?.user.profilePictureUrl ? (
                <Marble src={session.user.profilePictureUrl} className="w-12 h-12 border-2 border-indigo-200 hover:border-indigo-300 transition-colors" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
              )}
                <Marble 
                  src={session?.user.profilePictureUrl} 
                  className="w-12 h-12 border-2 border-indigo-200 hover:border-indigo-300 transition-colors" 
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
          }
        />
      </Page.Header>
      
      <Page.Main className="bg-gradient-to-br from-gray-50 to-white px-4 py-6">
        <HomeContent />
      </Page.Main>
    </>
  );
}
