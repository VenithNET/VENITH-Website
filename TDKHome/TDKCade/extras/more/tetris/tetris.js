<!--
// JavaScript�e�g���X  Programed by ��������炵
// ���̃X�N���v�g�́A���p�ړI�łȂ���΁A���R�Ɏg���Ă��������Č��\�ł��B
// �����A�z�z�����R�ɍs���Ă��������Ă��܂��܂���B
// ��҂ւ̘A�������v���܂���B
// �������A���̂T�s�̃R�����g�͏����Ȃ��ł��������B

tet_map = new Array(512);	// �e�g���X�̃}�b�v1
tet_map_col = new Array(512);	// �e�g���X�̃}�b�v2�i�F�j
blk_styl = new Array(16);	// �u���b�N�̌`
var blk_knd = 1;		// �u���b�N�̎��(1�`7)
nx_blk_styl = new Array(16);	// ���̃u���b�N�̌`
var nx_blk_knd = 1;		// ���̃u���b�N�̎��(1�`7)
bk_blk_styl = new Array(16);	// �u���b�N�̌`(�o�b�N�A�b�v�p)

var blk_x,blk_y;		// �u���b�N�̈ʒu
var dwn_cnt = 0;		// �_�E�����Ă���̑҂�����
var speed = 10;			// �Q�[���X�s�[�h
var spd_cnt = 0;		// �X�s�[�h�J�E���g
var total_line = 0;		// �������g�[�^�����C��
var level = 0;			// ���x��
var timer;

var start_flg = 0;		// �Q�[���X�^�[�g�t���O


// �Q�[�����������J�n
function init_game() {
	if( start_flg == 0 ) {
		init_map();	// �}�b�v������
		view_new();	// �V�����u���b�N�\��

		dwn_cnt = 0;	// �_�E�����Ă���̑҂����Ԃ�0�N���A
		speed = 25;	// �Q�[���X�s�[�h
		spd_cnt = 0;	// �X�s�[�h�J�E���g

		total_line = 0;		// �������g�[�^�����C��
		level = 0;		// ���x��

		timer = setTimeout("auto_dwn()",1);
		self.document.sc_form.score.value = total_line;

		start_flg = 1;
	}
}

// �Q�[���I�[�o�[
function game_over() {
	clearTimeout(timer);
	start_flg = 0;

	// �}�b�v���D�F�ɕ\��
	for( i=0;i<24;i++ ) {
		for( j=0;j<8;j++ ) {
			p = (i+4)*16+j+4;
			img_p = i*8+j;
			if( tet_map[p] > 0 ) {
				self.document.images[img_p].src="9.jpg";
			}
		}
	}

	w_data = "�Q�[���I�[�o�[\n���x��"+level;
	alert(w_data);
}


// �}�b�v������
function init_map() {
	for(i=0;i<512;i++) {
		tet_map[i] = 0;
		tet_map_col[i] = 0;
	}

	p=0;
	// �_�~�[�̏�4�s���P�Ŗ��߂�
	for(i=0;i<4;i++) {
		for(j=0;j<16;j++) {
			tet_map[p] = 1;
			p++;
		}
	}
	// ����24�s�͑O��8����1�Ŗ��߂�
	for(i=0;i<24;i++ ) {
		tet_map[p] = 1; p++;
		tet_map[p] = 1; p++;
		tet_map[p] = 1; p++;
		tet_map[p] = 1; p++;
		p+=8;
		tet_map[p] = 1; p++;
		tet_map[p] = 1; p++;
		tet_map[p] = 1; p++;
		tet_map[p] = 1; p++;
	}
	// �_�~�[�̉�4�s���P�Ŗ��߂�
	for(i=0;i<4;i++) {
		for(j=0;j<16;j++) {
			tet_map[p] = 1;
			p++;
		}
	}

	// �}�b�v��\��
	view_map(0,0,7,23);

	// ���̃u���b�N��ݒ聕�\��
	view_next();
}

// �}�b�v�\��
function view_map(sx,sy,ex,ey) {
	vie = "";		// �\���p

	stx = sx+4;		// �ŏ��̕\���ʒu(X)
	sty = sy+4;		// �ŏ��̕\���ʒu(Y)
	xsz = ex - sx + 1;	// �T�C�Y(X)
	ysz = ey - sy + 1;	// �T�C�Y(Y)

	for( i=0;i<ysz;i++ ) {
		for( j=0;j<xsz;j++ ) {
			p = (sty+i)*16 + stx + j;
			img_p = ( sty - 4 + i)*8+stx-4+j;

			if( (stx+j) > 11 ) continue;
			if( (stx+j) < 4 ) continue;
			if( (sty+i) > 27 ) continue;

			if( tet_map[p] == 1 ) {
				vie=tet_map_col[p]+".jpg";
				if(img_p >= 0 ) self.document.images[img_p].src=vie;
			} else {
				if(img_p >= 0 ) self.document.images[img_p].src="0.jpg";
			}
		}
	}
}

// ���̃u���b�N�̎擾���\��
function view_next() {
	vie="";		// �\���p

	dt = new Date();
	sec = dt.getSeconds()+1;
	for(i=0;i<sec;i++) {
		r = Math.round(Math.random() * 6);
	}
	// ���̃u���b�N�̎��
	nx_blk_knd=r+1;
	// �u���b�N�̌`������
	if( nx_blk_knd == 1 ) {		// �Ԗ_
		nx_blk_styl[   0] = 0;		// 1
		nx_blk_styl[   1] = 0;
		nx_blk_styl[   2] = 1;
		nx_blk_styl[   3] = 0;
		nx_blk_styl[ 4+0] = 0;		// 2
		nx_blk_styl[ 4+1] = 0;
		nx_blk_styl[ 4+2] = 1;
		nx_blk_styl[ 4+3] = 0;
		nx_blk_styl[ 8+0] = 0;		// 3
		nx_blk_styl[ 8+1] = 0;
		nx_blk_styl[ 8+2] = 1;
		nx_blk_styl[ 8+3] = 0;
		nx_blk_styl[12+0] = 0;		// 4
		nx_blk_styl[12+1] = 0;
		nx_blk_styl[12+2] = 1;
		nx_blk_styl[12+3] = 0;
	}
	if( nx_blk_knd == 2) {		// ���F�l�p
		nx_blk_styl[   0] = 0;		// 1
		nx_blk_styl[   1] = 0;
		nx_blk_styl[   2] = 0;
		nx_blk_styl[   3] = 0;
		nx_blk_styl[ 4+0] = 0;		// 2
		nx_blk_styl[ 4+1] = 1;
		nx_blk_styl[ 4+2] = 1;
		nx_blk_styl[ 4+3] = 0;
		nx_blk_styl[ 8+0] = 0;		// 3
		nx_blk_styl[ 8+1] = 1;
		nx_blk_styl[ 8+2] = 1;
		nx_blk_styl[ 8+3] = 0;
		nx_blk_styl[12+0] = 0;		// 4
		nx_blk_styl[12+1] = 0;
		nx_blk_styl[12+2] = 0;
		nx_blk_styl[12+3] = 0;
	}
	if( nx_blk_knd == 3) {		// ��
		nx_blk_styl[   0] = 0;		// 1
		nx_blk_styl[   1] = 0;
		nx_blk_styl[   2] = 0;
		nx_blk_styl[   3] = 0;
		nx_blk_styl[ 4+0] = 0;		// 2
		nx_blk_styl[ 4+1] = 1;
		nx_blk_styl[ 4+2] = 1;
		nx_blk_styl[ 4+3] = 0;
		nx_blk_styl[ 8+0] = 0;		// 3
		nx_blk_styl[ 8+1] = 1;
		nx_blk_styl[ 8+2] = 0;
		nx_blk_styl[ 8+3] = 0;
		nx_blk_styl[12+0] = 0;		// 4
		nx_blk_styl[12+1] = 1;
		nx_blk_styl[12+2] = 0;
		nx_blk_styl[12+3] = 0;
	}
	if( nx_blk_knd == 4) {		// �I�����W��
		nx_blk_styl[   0] = 0;		// 1
		nx_blk_styl[   1] = 0;
		nx_blk_styl[   2] = 0;
		nx_blk_styl[   3] = 0;
		nx_blk_styl[ 4+0] = 0;		// 2
		nx_blk_styl[ 4+1] = 1;
		nx_blk_styl[ 4+2] = 1;
		nx_blk_styl[ 4+3] = 0;
		nx_blk_styl[ 8+0] = 0;		// 3
		nx_blk_styl[ 8+1] = 0;
		nx_blk_styl[ 8+2] = 1;
		nx_blk_styl[ 8+3] = 0;
		nx_blk_styl[12+0] = 0;		// 4
		nx_blk_styl[12+1] = 0;
		nx_blk_styl[12+2] = 1;
		nx_blk_styl[12+3] = 0;
	}
	if( nx_blk_knd == 5) {		// ���Βi
		nx_blk_styl[   0] = 0;		// 1
		nx_blk_styl[   1] = 0;
		nx_blk_styl[   2] = 0;
		nx_blk_styl[   3] = 0;
		nx_blk_styl[ 4+0] = 0;		// 2
		nx_blk_styl[ 4+1] = 0;
		nx_blk_styl[ 4+2] = 1;
		nx_blk_styl[ 4+3] = 0;
		nx_blk_styl[ 8+0] = 0;		// 3
		nx_blk_styl[ 8+1] = 1;
		nx_blk_styl[ 8+2] = 1;
		nx_blk_styl[ 8+3] = 0;
		nx_blk_styl[12+0] = 0;		// 4
		nx_blk_styl[12+1] = 1;
		nx_blk_styl[12+2] = 0;
		nx_blk_styl[12+3] = 0;
	}
	if( nx_blk_knd == 6) {		// ���i
		nx_blk_styl[   0] = 0;		// 1
		nx_blk_styl[   1] = 0;
		nx_blk_styl[   2] = 0;
		nx_blk_styl[   3] = 0;
		nx_blk_styl[ 4+0] = 0;		// 2
		nx_blk_styl[ 4+1] = 1;
		nx_blk_styl[ 4+2] = 0;
		nx_blk_styl[ 4+3] = 0;
		nx_blk_styl[ 8+0] = 0;		// 3
		nx_blk_styl[ 8+1] = 1;
		nx_blk_styl[ 8+2] = 1;
		nx_blk_styl[ 8+3] = 0;
		nx_blk_styl[12+0] = 0;		// 4
		nx_blk_styl[12+1] = 0;
		nx_blk_styl[12+2] = 1;
		nx_blk_styl[12+3] = 0;
	}
	if( nx_blk_knd == 7) {		// ���F��
		nx_blk_styl[   0] = 0;		// 1
		nx_blk_styl[   1] = 0;
		nx_blk_styl[   2] = 0;
		nx_blk_styl[   3] = 0;
		nx_blk_styl[ 4+0] = 0;		// 2
		nx_blk_styl[ 4+1] = 1;
		nx_blk_styl[ 4+2] = 0;
		nx_blk_styl[ 4+3] = 0;
		nx_blk_styl[ 8+0] = 1;		// 3
		nx_blk_styl[ 8+1] = 1;
		nx_blk_styl[ 8+2] = 1;
		nx_blk_styl[ 8+3] = 0;
		nx_blk_styl[12+0] = 0;		// 4
		nx_blk_styl[12+1] = 0;
		nx_blk_styl[12+2] = 0;
		nx_blk_styl[12+3] = 0;
	}

	// �\��
	vie = nx_blk_knd+".jpg";
	for( i=0;i<16;i++ ) {
		if( nx_blk_styl[i] == 1 ) {
			self.document.images[192+i].src=vie;
		} else {
			self.document.images[192+i].src="0.jpg";
		}
	}
}

// �V�����u���b�N���Q�b�g����ѕ\��
function view_new() {

	// ���̃u���b�N�����̃u���b�N��
	blk_knd = nx_blk_knd;
	for( i=0;i<16;i++ ) {
		blk_styl[i] = nx_blk_styl[i]
	}

	// �u���b�N�ʒu�ݒ�
	if( blk_knd == 1 ) {
		blk_y = 4;
	} else {
		blk_y = 3;
	}
	blk_x = 7;

	// ���̃u���b�N�ݒ�
	view_next();

	// �u���b�N���Ԃ��������ǂ����`�F�b�N
	chk = chk_blk(blk_x,blk_y);

	// �u���b�N�\��
	view_blk();

	// �Ԃ����Ă�����Q�[���I�[�o�[
	if( chk == 0 ) {
		game_over();
	}
}

// �u���b�N��\��
function view_blk() {
	vie="";		// �\���p

	stx = blk_x;		// �ŏ��̕\���ʒu(X)
	sty = blk_y;		// �ŏ��̕\���ʒu(Y)

	for( i=0;i<4;i++ ) {
		for( j=0;j<4;j++ ) {
			p = (sty+i)*16 + stx + j;
			img_p = (sty+i-4)*8+(stx+j-4);
			blk_p = i*4+j;

			if( (stx+j) > 11 ) continue;
			if( (stx+j) < 4 ) continue;
			if( (sty+i) > 27 ) continue;

			if( blk_styl[blk_p] > 0 ) {
				vie=blk_knd+".jpg";
				self.document.images[img_p].src=vie;
			} else {
				if( tet_map[p] == 1) {
					vie=tet_map_col[p]+".jpg";
					if( img_p >= 0) self.document.images[img_p].src=vie;
				} else {
					if( img_p >= 0) self.document.images[img_p].src="0.jpg";
				}
			}
		}
	}
}

//�u���b�N���Ԃ��������ǂ����`�F�b�N
function chk_blk(x,y) {
	for( i=0;i<4;i++ ) {
		for( j=0;j<4;j++ ) {
			map_p = (y + i)*16 + x+j;
			blk_p = i*4+j;
			if( tet_map[map_p] > 0 && blk_styl[blk_p] > 0 ) {
				return	0;	// Out
			}
		}
	}
	return 1;		// OK
}


// ���R����
function auto_dwn() {
	spd_cnt++;
	if( spd_cnt > speed ) {
		spd_cnt = 0;
		blk_dwn();
	}
	if( start_flg > 0) timer = setTimeout("auto_dwn()",1);
}

// ����Ńu���b�N�����ɗ��Ƃ�
function blk_dwn2() {
	blk_dwn();
	speed = 0;
}

// �u���b�N�����ɗ��Ƃ�
function blk_dwn() {
	// ���ɗ��Ƃ��邩�ǂ����`�F�b�N
	chk = chk_blk(blk_x,blk_y+1);

	// ���ɗ��Ƃ��Ȃ��ꍇ�u���b�N�J�E���g���C���N�������g
	if( chk == 0 ) {
		dwn_cnt++;
		// �_�E���J�E���g��5�ɂȂ�����u���b�N���Œ肵�Ď��̃u���b�N���o��
		if( dwn_cnt == 5 ) {
			// �X�s�[�h�����ɖ߂�
			speed = 25-level;
			if( speed < 0 ) speed = 0;
			dwn_cnt = 0;
			for( i=0;i<4;i++ ) {
				for( j=0;j<4;j++ ) {
					map_p = (blk_y + i)*16 + blk_x + j;
					blk_p = i*4+j;
					if( blk_styl[blk_p] > 0 ) {
						tet_map[map_p] = blk_styl[blk_p];
						tet_map_col[map_p] = blk_knd;
					}
				}
			}

			// ���C��������
			clear_line();

			// �}�b�v�\��
//			wdata="";
//			for( i=0;i<32;i++) {
//				for( j=0;j<16;j++) {
//					p = i*16+j;
//					wdata = wdata+tet_map[p];
//				}
//				wdata = wdata+"\n";
//			}
//			alert(wdata);

			view_new();
		}
	} else {
		// ���Ƃ���ꍇ�͗��Ƃ�
		view_map(blk_x-4,blk_y-4,blk_x,blk_y);
		blk_y++;
		view_blk();
	}
}

// �u���b�N���E�Ɉړ�
function blk_rgt() {
	if( start_flg == 0 ) return;

	// �E�Ɉړ��ł��邩�ǂ����`�F�b�N
	chk = chk_blk(blk_x+1,blk_y);

	// �E�Ɉړ��ł���ꍇ
	if( chk == 1 ) {
		view_map(blk_x-4,blk_y-4,blk_x,blk_y);
		blk_x++;
		dwn_cnt = 0;	// �_�E���J�E���g��0�ɂ��Ă���
		// �X�s�[�h�����ɖ߂�
		speed = 25-level;
		if( speed < 0 ) speed = 0;
		view_blk();
	}
}

// �u���b�N�����Ɉړ�
function blk_lft() {
	if( start_flg == 0 ) return;

	// ���Ɉړ��ł��邩�ǂ����`�F�b�N
	chk = chk_blk(blk_x-1,blk_y);

	// �E�Ɉړ��ł���ꍇ
	if( chk == 1 ) {
		view_map(blk_x-4,blk_y-4,blk_x,blk_y);
		blk_x--;
		dwn_cnt = 0;	// �_�E���J�E���g��0�ɂ��Ă���
		// �X�s�[�h�����ɖ߂�
		speed = 25-level;
		if( speed < 0 ) speed = 0;
		view_blk();
	}
}


// �u���b�N����]
function blk_trn() {
	if( start_flg == 0 ) return;

	// ���Ƃ̃f�[�^���o�b�N�A�b�v
	for( i=0;i<16;i++ ) {
		bk_blk_styl[i] = blk_styl[i]
	}

	// ��]������
	for( i=0;i<4;i++ ) {
		for( j=0;j<4;j++ ) {
			sp = i*4+j;
			dp = j*4+(3-i);
			blk_styl[dp] = bk_blk_styl[sp];
		}
	}

	// ��]��ɂԂ��邩�ǂ������`�F�b�N
	chk = chk_blk(blk_x,blk_y);

	// �Ԃ���ꍇ�f�[�^��߂�
	if( chk == 0 ) {
		for( i=0;i<16;i++ ) {
			blk_styl[i] = bk_blk_styl[i]
		}
	} else {	// �Ԃ���Ȃ��ꍇ�́A�\������
		view_map(blk_x-4,blk_y-4,blk_x,blk_y);
		dwn_cnt = 0;	// �_�E���J�E���g��0�ɂ��Ă���
		view_blk();
	}
	// �X�s�[�h�����ɖ߂�
	speed = 25 -level;
	if( speed < 0 ) speed = 0;

}


//���C��������
function clear_line() {
	kesi_line = 0;
	ed_line = 0;
	for( i=23;i>=0;i-- ) {
		chk = 1;
		chk2 = 0;
		for( j=0;j<8;j++ ) {
			map_p = (i+4)*16+j+4;
			chk = chk * tet_map[map_p];
			chk2 = chk2 + tet_map[map_p];
		}
		if( chk == 1 ) {	// �S���P�Ȃ烉�C��������
			if( kesi_line == 0 ) {	// �ŏ��̎��́A�J�n���C����ݒ�
				st_line = i;
			}
			kesi_line++;
			for( j=0;j<8;j++ ) {
				map_p = (i+4)*16+j+4;
				img_p = i*8+j;
				tet_map[map_p] = 0;
				tet_map_col[map_p] = 0;
//				self.document.images[img_p].src="0.jpg";
			}
		}
		if( chk2 == 0 ) {	// �S��0�Ȃ炻���őł��؂�
			ed_line = i;
			break;
		}
	}

	// �������C��������Ȃ�A�O�ɋl�߂�
	if( kesi_line > 0 ) {
		cnt = st_line - kesi_line;
		cnt2 = ed_line - kesi_line;
		if( cnt2 < 0 ) cnt2 = 0;
		for( i=cnt;i>=cnt2;i-- ) {
			src = i;
			dst = i+kesi_line;
			for( j=0;j<8;j++ ) {
				src_p = (src+4)*16+j+4;
				dst_p = (dst+4)*16+j+4;
				tet_map[dst_p] = tet_map[src_p] ;
				tet_map_col[dst_p] = tet_map_col[src_p] ;
			}
		}
		// �}�b�v��\��
		view_map(0,ed_line,7,st_line);
		// �_�����Z�A���x�����Z
		total_line += kesi_line;
		self.document.sc_form.score.value = total_line;
		level = Math.round(total_line / 5);
		speed = 25-level;
		if( speed < 0 ) speed = 0;

	}
}


// -->