package SulyozattAtlagSzamitas;

import java.awt.EventQueue;
import java.util.ArrayList;

import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;
import java.awt.Color;
import javax.swing.JButton;
import javax.swing.JTextArea;
import javax.swing.JScrollPane;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import Program.*;
import java.awt.BorderLayout;
import javax.swing.JPanel;
import java.awt.GridLayout;

public class Joslas extends JFrame {
	private JTextField textUjtargy;
	private JTextField textMinimumAtlag;
	private ArrayList<Targyak> alap = new ArrayList<Targyak>();
	private ArrayList<Targyak> josolt = new ArrayList<Targyak>();
	private int ujTargyszam = 0;
	private JTextField textNev;
	private JTextField textKredit;
	private JTextArea textJoslatok;
	private Ellenorzo c = new Ellenorzo();
	private TablaKezelo tabKez;

	public Joslas(JFrame f, ArrayList alist) {
		alap = alist;
		setBounds(100, 100, 328, 409);
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		getContentPane().setLayout(new BorderLayout(0, 0));
		
		JPanel KozepsoPanel = new JPanel();
		getContentPane().add(KozepsoPanel, BorderLayout.CENTER);
		
		JPanel AlsoPanel = new JPanel();
		getContentPane().add(AlsoPanel, BorderLayout.SOUTH);
		
		JPanel FelsoPanel = new JPanel();
		getContentPane().add(FelsoPanel, BorderLayout.NORTH);
		FelsoPanel.setLayout(new GridLayout(0, 2, 0, 0));
		
		JLabel lblTrgyNv = new JLabel("Tárgy név");
		FelsoPanel.add(lblTrgyNv);
		
		JLabel lblKredit = new JLabel("Kredit");
		FelsoPanel.add(lblKredit);
		
		textNev = new JTextField();
		textNev.setColumns(10);
		textNev.setBackground(Color.WHITE);
		FelsoPanel.add(textNev);
		
		textKredit = new JTextField();
		textKredit.setColumns(10);
		textKredit.setBackground(Color.WHITE);
		FelsoPanel.add(textKredit);
		
		JLabel lblUjFelvetTargy = new JLabel("Új felvett tárgy");
		FelsoPanel.add(lblUjFelvetTargy);
		
		JLabel label = new JLabel("");
		FelsoPanel.add(label);
		
		textUjtargy = new JTextField(""+ujTargyszam);
		textUjtargy.setBackground(Color.WHITE);
		textUjtargy.setEditable(false);
		FelsoPanel.add(textUjtargy);
		textUjtargy.setColumns(10);
		
		JButton btnUjTargyFelvetele = new JButton("Új tárgy felvétele");
		btnUjTargyFelvetele.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(c.filled(textNev, "Név")) {
					if(c.goodInt(textKredit, "Kredit")) {
						Megerosito me = new Megerosito(Joslas.this, "Biztos felveszi ezt az új tárgyat");
						me.setVisible(true);
						if(me.erosit) {
							josolt.add(new Targyak(RTF(textNev), Integer.parseInt(RTF(textKredit)), 0));
							ujTargyszam += 1;
							textUjtargy.setText(""+ujTargyszam);
						}
					}
				}
				textNev.setText("");
				textKredit.setText("");
			}
		});
		FelsoPanel.add(btnUjTargyFelvetele);
		
		JLabel lblKivantMinimumAtlag = new JLabel("Kívánt minimum átleg");
		FelsoPanel.add(lblKivantMinimumAtlag);
		
		JLabel label_1 = new JLabel("");
		FelsoPanel.add(label_1);
		
		textMinimumAtlag = new JTextField();
		textMinimumAtlag.setColumns(10);
		textMinimumAtlag.setBackground(Color.WHITE);
		FelsoPanel.add(textMinimumAtlag);
		
		JButton btnSzmts = new JButton("Számítás");
		btnSzmts.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textJoslatok.setText("");
				szamitotjoslat();
			}
		});
		FelsoPanel.add(btnSzmts);
		KozepsoPanel.setLayout(new GridLayout(0, 1, 0, 0));
		
		JScrollPane scrollPane = new JScrollPane();
		KozepsoPanel.add(scrollPane);
		
		textJoslatok = new JTextArea();
		textJoslatok.setEditable(false);
		scrollPane.setViewportView(textJoslatok);
		
		JButton btnTisztt = new JButton("Tisztít");
		btnTisztt.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				josolt.clear();
				ujTargyszam = 0;
				textUjtargy.setText(""+ujTargyszam);
				textJoslatok.setText("");
				textMinimumAtlag.setText("");
			}
		});
		AlsoPanel.add(btnTisztt);
		
		JButton btnBezr = new JButton("Bezár");
		btnBezr.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				tabKez = FileManager.sAtlagBeolvaso("Data\\eredmenyek.csv");
				SatlagSz csl = new SatlagSz(tabKez);
				dispose();
				csl.setVisible(true);
			}
		});
		AlsoPanel.add(btnBezr);
		
		

	}
	
	public String RTF(JTextField jtf) {
		return jtf.getText();
	}
	
	public void szamitotjoslat() {
		int sum = 0, ksum = 0;
		for(int i = 0; i < alap.size(); i++) {
			sum = sum + (alap.get(i).getJegy() * alap.get(i).getKredit());
			ksum = ksum + alap.get(i).getKredit();
		}
		
		
		double minatlag = Double.parseDouble(textMinimumAtlag.getText());
		
		while(josolt.get(josolt.size()-1).getJegy() != 5) {
			int hossz = (int)Math.pow(6, ujTargyszam);
			int ujsum = 0, ujksum = 0;
			for(int i = 0; i < josolt.size(); i++) {
				ujsum = ujsum + (josolt.get(i).getJegy() * josolt.get(i).getKredit());
				if(josolt.get(i).getJegy() > 0) {
					ujksum = ujksum + josolt.get(i).getKredit();
				}
			}
			ujsum += sum;
			ujksum += ksum;
			double atlag = (double)ujsum/ujksum;
			if(atlag >= minatlag) {
				textJoslatok.append("Jósolt értékek:"+System.getProperty("line.separator"));
				for(int i = 0; i < josolt.size(); i++) {
					textJoslatok.append(josolt.get(i).toString()+System.getProperty("line.separator"));
				}
				textJoslatok.append("Átlag: "+atlag+System.getProperty("line.separator"));
			}
			textJoslatok.append(System.getProperty("line.separator"));
			novelo();
		}
		
	}
	
	public void novelo() {
		josolt.get(0).setJegy((josolt.get(0).getJegy()+1));
		
		for(int i = 0; i < josolt.size(); i++) {
			if(josolt.get(i).getJegy() > 5) {
				josolt.get(i+1).setJegy((josolt.get(i+1).getJegy()+1));
				josolt.get(i).setJegy(0);
			}
		}
	}
}
