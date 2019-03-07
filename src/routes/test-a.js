import { Router } from 'express';
import fs from 'fs';
import steem from '@steemit/steem-js';

const router = Router();

router.get('/', (req, res) => {
    // set config
    var configUrl = 'http://192.168.6.100:8090';
    var testingAccount = 'initminer';
    var wif = '5HuVghGZvimhc5wkNA574wsDPwrsRfYrMAoh7UwHn8kQ5D8YZZV';
    if (req.query) {
        if (req.query.urlHost) {
            configUrl = req.query.urlHost;
        }
        if (req.query.account) {
            testingAccount = req.query.account;
        }
        if (req.query.wif) {
            wif = req.query.wif;
        }
    }
    steem.api.setOptions({
        address_prefix: 'TST',
        chain_id: '18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e',
        url: configUrl,
        retry: true,
        useAppbaseApi: !!configUrl,
    });

    steem.config.set('address_prefix', 'TST');
    steem.config.set('chain_id', '18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e');
    steem.config.set('transport', 'http');
    steem.config.set('uri', configUrl);

    var file = fs.createWriteStream('test/test-a.txt');

    steem.broadcast.createProposal(wif, 'initminer', 'initminer', '2019-03-18T00:00:00', '2019-04-01T00:00:00', '5.000 TBD', 'this is example', 'http://url.html', function(err, result) {
        file.write('Test create_proposal' + '\n\n');
        file.write('Params: wif: ' + wif + ', creator: ' + testingAccount + ', receiver: initminer, start_date: 2019-03-18T00:00:00, end_date: 2019-04-01T00:00:00, daily_pay: 5.000 TBD, subject: this is example, url: http://url.html' + '\n');
        if (err) {
            file.write('Rresponse: ' + JSON.stringify(err) + '\n\n\n');
        } else if (result) {
            file.write('Rresponse: ' + JSON.stringify(result) + '\n\n\n');
        }
    });

    steem.broadcast.updateProposalVotes(wif, 'initminer', [0], true, function(err, result) {
        file.write('Test update_proposal_votes' + '\n\n');
        file.write('Params: wif: ' + wif + ', voter: ' + testingAccount + ', proposal_ids: [0], approve: true' + '\n');
        if (err) {
            file.write('Rresponse: ' + JSON.stringify(err) + '\n\n\n');
        } else if (result) {
            file.write('Rresponse: ' + JSON.stringify(result) + '\n\n\n');
        }
    });

    steem.broadcast.removeProposal(wif, 'initminer', [0], function(err, result) {
        file.write('Test remove_proposal' + '\n\n');
        file.write('Params: wif: ' + wif + ', proposal_owner: ' + testingAccount + ', proposal_ids: [0]' + '\n');
        if (err) {
            file.write('Rresponse: ' + JSON.stringify(err) + '\n\n\n');
        } else if (result) {
            file.write('Rresponse: ' + JSON.stringify(result) + '\n\n\n');
        }
    });

    steem.api.findProposals([0], function(err, result) {
        file.write('Test find_proposals' + '\n\n');
        file.write('Params: id_set: [0]' + '\n');
        if (err) {
            file.write('Rresponse: ' + JSON.stringify(err) + '\n\n\n');
        } else if (result) {
            file.write('Rresponse: ' + JSON.stringify(result) + '\n\n\n');
        }
    });

    steem.api.listProposals(testingAccount, 'by_creator', 'direction_ascending', 5, -1, function(err, result) {
        file.write('Test list_proposals' + '\n\n');
        file.write('Params: start: ' + testingAccount + ', order_by: by_creator, order_direction: direction_ascending, limit: 5, active: -1' + '\n');
        if (err) {
            file.write('Rresponse: ' + JSON.stringify(err) + '\n\n\n');
        } else if (result) {
            file.write('Rresponse: ' + JSON.stringify(result) + '\n\n\n');
        }
    });

    steem.api.listVoterProposals(testingAccount, 'by_creator', 'direction_ascending', 5, -1, function(err, result) {
        file.write('Test list_voter_proposals' + '\n\n');
        file.write('Params: voter: ' + testingAccount + ', order_by: by_creator, order_direction: direction_ascending, limit: 5, active: -1' + '\n');
        if (err) {
            file.write('Rresponse: ' + JSON.stringify(err) + '\n\n\n');
        } else if (result) {
            file.write('Rresponse: ' + JSON.stringify(result) + '\n\n\n');
        }
    });

    res.send({ status: steem }).end();
});

export default router;
