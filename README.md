# netkomrade-client
Browser client for Netkomrade, extensible IRC client/bot with persistent session settings similar to IRCcloud

Work in progress. Feedback very appreciated.

# Instrutions
The server endpoint is configured in src/js/config/settings.js

The client interprets commands defined in src/js/commands/commandConf.js

Command format is "/command".

The client must first load a session from the server: 

- /load_session sessionpass

Once the client is connected to the server, you can:
- add/set a network with /set_network networkName address port nick. Example: /set_network freenode chat.freenode.net 6697 mutant2051
- remove network: /remove_network networkName
- join a channel: /join channel network. Example: /join #think freenode
- query a nick: /query nick network. Example: /query randomnick250 freenode
- part a channel or close nick tab with /close

# License
BSD
